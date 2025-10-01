import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from '../../../schema/question.schema';
import { Model, Types } from 'mongoose';
import { Survey, SurveyDocument } from '../../../schema/survey.schema';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Response } from 'express';
import { DeleteQuestionsDto } from '../dto/delete-questions.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { GetListQuestionsDto } from '../dto/get-list-questions.dto';
import { PaginationService } from '../../pagination/service/pagination.service';
import {
  convertTextToRegex,
  getQueryOptions,
  toObjectIdArray,
} from '../../../utils';
import { Answer, AnswerDocument } from '../../../schema/answer.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    private readonly paginationService: PaginationService,
  ) {}

  async getListQuestions(query: GetListQuestionsDto, res: Response) {
    const ids = toObjectIdArray(query.surveyIds); // query.surveyIds can be string or string[]

    const rawObjData = {
      // match ANY of provided ids (documents whose surveyIds contains at least one of the ids)
      ...(ids.length ? { surveyIds: { $in: ids } } : {}),
      questionTitle: convertTextToRegex(query.questionTitle),
      layout: query.layout,
      questionType: query.questionType,
      placeholder: convertTextToRegex(query.placeholder),
    };

    const queryOptions: Record<string, any> = getQueryOptions(rawObjData);

    const listQuestions = await this.paginationService.getPaginationData(
      this.questionModel,
      query,
      queryOptions,
    );
    return res.json(listQuestions);
  }

  async getDetailQuestion(id: string, res: Response) {
    const specificQuestion = await this.questionModel
      .findById(id)
      .lean()
      .exec();
    if (!specificQuestion) throw new NotFoundException();

    const { surveyIds } = specificQuestion;
    if (!surveyIds || !surveyIds.length) {
      return res.json(specificQuestion);
    }

    // Normalize surveyIds to string form for safe comparisons
    const surveyIdStrs = surveyIds.map((s: any) => String(s));

    // Query answers in one shot (select only needed fields)
    const filter = {
      questionId: Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id,
      surveyId: {
        $in: surveyIdStrs.map((s) =>
          Types.ObjectId.isValid(s) ? new Types.ObjectId(s) : s,
        ),
      },
    };
    const answers = await this.answerModel
      .find(filter)
      .select(
        '_id surveyId responseSessionId valueString chosenKey numericValue createdAt updatedAt',
      )
      .lean()
      .exec();

    // build a map from surveyId string -> array of answers (or single answer depending on your shape)
    const map = new Map<string, any[]>();
    for (const a of answers) {
      const key = String(a.surveyId);
      const arr = map.get(key);
      if (arr) arr.push(a);
      else map.set(key, [a]);
    }

    // produce grouped array in the same order as specificQuestion.surveyIds
    const groupsAnswersAndSurveys: any[][] = surveyIdStrs
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .map((sidStr: string) => map.get(sidStr) ?? []) // empty array if none
      .filter((arr) => arr.length > 0); // optionally filter out empty groups

    const response = {
      ...specificQuestion,
      answers: groupsAnswersAndSurveys,
    };
    return res.json(response);
  }

  async createQuestion(
    dto: CreateQuestionDto,
    res: Response,
  ): Promise<Response> {
    const newQuestion = await this.questionModel.create(dto);
    const plainResponse = newQuestion.toObject();
    return res.json(plainResponse);
  }

  async updateSurveyIdIntoQuestion(
    questionId: string,
    surveyId: Types.ObjectId,
  ) {
    if (!Types.ObjectId.isValid(questionId)) {
      throw new BadRequestException('Invalid questionId');
    }
    const questionObjectId = new Types.ObjectId(questionId);

    // normalize surveyId: accept string or ObjectId
    let surveyObjectId: Types.ObjectId;
    if (typeof surveyId === 'string') {
      if (!Types.ObjectId.isValid(surveyId)) {
        throw new BadRequestException('Invalid surveyId');
      }
      surveyObjectId = new Types.ObjectId(surveyId);
    } else {
      surveyObjectId = surveyId;
    }
    // Atomic add if missing
    const updateRes: any = await this.questionModel
      .updateOne(
        { _id: questionObjectId },
        { $addToSet: { surveyIds: surveyObjectId } },
      )
      .exec();

    // Use the modern result fields
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const matched: any = updateRes.matchedCount ?? 0;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const modified: any = updateRes.modifiedCount ?? 0;

    if (matched === 0) {
      throw new NotFoundException(`Question ${questionId} not found`);
    }
    const added = modified > 0;

    // Optionally fetch the updated document (if you need to return it)
    const updatedQuestion = await this.questionModel
      .findById(questionObjectId)
      .lean();

    return { added, question: updatedQuestion };
  }

  async updateQuestion(id: string, dto: UpdateQuestionDto, res: Response) {
    const specificQuestion = await this.questionModel.findById(id).exec();
    if (!specificQuestion) {
      throw new NotFoundException();
    } else {
      const updatedQuestion = await this.questionModel
        .findByIdAndUpdate(id, { ...dto }, { new: true })
        .exec();
      return res.json(updatedQuestion);
    }
  }

  async deleteQuestions(dto: DeleteQuestionsDto) {
    const ids = dto.ids;

    const trimmed = ids.map((id: string) => id.trim());
    const invalidIds = trimmed.filter(
      (id: string) => !Types.ObjectId.isValid(id),
    );

    if (invalidIds.length > 0) {
      throw new BadRequestException(
        `Invalid question id(s): ${invalidIds.join(', ')}`,
      );
    }

    const questionIdObjectIds = trimmed.map(
      (id: string) => new Types.ObjectId(id),
    );
    const questionIdStrs = trimmed;
    const updateRes = await this.surveyModel
      .updateMany(
        { questions: { $in: questionIdObjectIds } },
        { $pull: { questions: { $in: questionIdObjectIds } } },
      )
      .exec();

    const modified = updateRes.modifiedCount ?? 0;
    if (modified === 0) {
      await this.surveyModel
        .updateMany(
          { questions: { $in: questionIdStrs } },
          { $pull: { questions: { $in: questionIdStrs } } },
        )
        .exec();
    }

    return await this.questionModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
