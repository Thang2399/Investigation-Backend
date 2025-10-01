import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey, SurveyDocument } from '../../../schema/survey.schema';
import { Model, Types } from 'mongoose';
import { CreateSurveyDto } from '../dto/create-survey.dto';
import { Response } from 'express';
import { Question, QuestionDocument } from '../../../schema/question.schema';
import { QuestionService } from '../../question/service/question.service';
import { DeleteSurveysDto } from '../dto/delete-surveys.dto';
import { UpdateSurveyDto } from '../dto/update-survey.dto';
import { GetListSurveysDto } from '../dto/get-list-surveys.dto';
import {
  convertTextToRegex,
  getQueryOptions,
  toObjectIdArray,
} from '../../../utils';
import { PaginationService } from '../../pagination/service/pagination.service';
import { BooleanValuesEnum } from '../../pagination/enum/pagination.enum';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<SurveyDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    private questionService: QuestionService,
    private paginationService: PaginationService,
  ) {}

  async getListSurveys(query: GetListSurveysDto, res: Response) {
    const questionsIds = toObjectIdArray(query.questions);

    const rawObjData = {
      ...(questionsIds.length ? { questions: { $in: questionsIds } } : {}),
      surveyTitle: convertTextToRegex(query.surveyTitle),
      numberOfQuestions: query.numberOfQuestions,
      isLimitedSurvey: query.isLimitedSurvey === BooleanValuesEnum.True,
    };

    const queryOptions: Record<string, any> = getQueryOptions(rawObjData);

    const listSurveys = await this.paginationService.getPaginationData(
      this.surveyModel,
      query,
      queryOptions,
    );

    return res.json(listSurveys);
  }

  async createNewSurvey(dto: CreateSurveyDto, res: Response) {
    const questions = dto.questions;
    const newSurveyDto = {
      ...dto,
      numberOfQuestions: questions.length,
    };
    const newSurvey = await this.surveyModel.create(newSurveyDto);
    const plainSurvey = newSurvey.toObject();
    const id = plainSurvey._id;
    for (const q of questions) {
      await this.questionService.updateSurveyIdIntoQuestion(q, id);
    }

    return res.json(plainSurvey);
  }

  async getDetailSurvey(id: string) {
    const specificSurvey = await this.surveyModel.findById(id).exec();
    if (!specificSurvey) {
      throw new NotFoundException('No specific survey found.');
    } else {
      const questions = specificSurvey.questions;
      const docs = await this.questionModel
        .find({ _id: { $in: questions } })
        .lean();

      const res = specificSurvey.toObject();
      return { ...res, questions: docs };
    }
  }

  async updateSurvey(id: string, dto: UpdateSurveyDto, res: Response) {
    const specificSurvey = await this.surveyModel.findById(id).exec();
    if (!specificSurvey) {
      throw new NotFoundException('No specific survey');
    } else {
      const questions = dto.questions;
      for (const q of questions) {
        await this.questionService.updateSurveyIdIntoQuestion(
          q,
          specificSurvey._id,
        );
      }
      const updatedSurveyObj = {
        ...dto,
        numberOfQuestions: questions.length,
      };

      const updatedSurvey = await this.surveyModel
        .findByIdAndUpdate(id, { ...updatedSurveyObj }, { new: true })
        .exec();

      return res.json(updatedSurvey);
    }
  }

  async deleteSurveys(dto: DeleteSurveysDto, res: Response) {
    const surveyIds = dto.surveyIds;
    if (!Array.isArray(surveyIds) || surveyIds.length === 0) {
      throw new BadRequestException('surveyIds must be a non-empty array');
    }

    // validate id strings and trim
    const trimmed = surveyIds.map((s) => s.trim());
    const invalid = trimmed.filter((id) => !Types.ObjectId.isValid(id));
    if (invalid.length) {
      throw new BadRequestException(
        `Invalid survey id(s): ${invalid.join(', ')}`,
      );
    }

    // prepare both representations
    const surveyIdOids = trimmed.map((id) => new Types.ObjectId(id));
    const surveyIdStrs = trimmed;

    // Try removing ObjectId values first (common when surveyIds stored as ObjectIds)
    const updateRes = await this.questionModel
      .updateMany(
        { surveyIds: { $in: surveyIdOids } },
        { $pull: { surveyIds: { $in: surveyIdOids } } },
      )
      .exec();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const modified = (updateRes as any).modifiedCount ?? 0;

    // If nothing changed, try the string representation (in case surveyIds are stored as strings)
    if (modified === 0) {
      await this.questionModel
        .updateMany(
          { surveyIds: { $in: surveyIdStrs } },
          { $pull: { surveyIds: { $in: surveyIdStrs } } },
        )
        .exec();
    }

    // Delete surveys by ObjectId
    const deleteRes = await this.surveyModel
      .deleteMany({ _id: { $in: surveyIdOids } })
      .exec();

    return res.json(deleteRes);
  }
}
