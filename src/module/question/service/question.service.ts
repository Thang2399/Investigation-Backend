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

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
  ) {}
  async getDetailQuestion(id: string) {
    const specificQuestion = await this.questionModel.findById(id);
    if (!specificQuestion) {
      throw new NotFoundException();
    } else {
      return specificQuestion;
    }
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
