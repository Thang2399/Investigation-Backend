import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SessionAnswer,
  SessionAnswerDocument,
} from '../../../schema/session-answer.schema';
import { Model } from 'mongoose';
import { CreateSessionAnswerDto } from '../dto/create-session-answer.dto';
import { Response } from 'express';
import {
  ResponseSession,
  ResponseSessionDocument,
} from '../../../schema/response-session.schema';
import { Survey, SurveyDocument } from '../../../schema/survey.schema';

@Injectable()
export class SessionAnswerService {
  constructor(
    @InjectModel(SessionAnswer.name)
    private readonly sessionAnswerModel: Model<SessionAnswerDocument>,
    @InjectModel(ResponseSession.name)
    private readonly responseSessionModel: Model<ResponseSessionDocument>,
    @InjectModel(Survey.name)
    private readonly surveyModel: Model<SurveyDocument>,
  ) {}

  async createSessionAnswer(dto: CreateSessionAnswerDto, res: Response) {
    const { surveyId, responseSessionId } = dto;
    // check specific survey and sessionId
    const specificSurvey = await this.surveyModel.findById(surveyId).exec();
    const specificResponseSession = await this.responseSessionModel
      .findOne({ _id: responseSessionId, surveyId })
      .exec();

    if (!specificSurvey) {
      throw new NotFoundException(
        `No survey with surveyId: ${surveyId.toString()}`,
      );
    }
    if (!specificResponseSession) {
      throw new NotFoundException(
        `No response session id with surveyId: ${surveyId.toString()} and responseSessionId: ${responseSessionId.toString()}`,
      );
    }

    const obj = { ...dto, answers: [] };

    const newSessionAnswer = await this.sessionAnswerModel.create(obj);
    return res.json(newSessionAnswer.toObject());
  }
}
