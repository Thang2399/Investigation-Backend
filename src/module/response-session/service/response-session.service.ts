import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ResponseSession,
  ResponseSessionDocument,
} from '../../../schema/response-session.schema';
import { Model } from 'mongoose';
import { CreateResponseSessionDto } from '../dto/create-response-session.dto';
import { Response } from 'express';
import { Response_Enum } from '../../../enum/index.enum';
import { Survey, SurveyDocument } from '../../../schema/survey.schema';
import { UpdateStatusResponseSessionDTO } from '../dto/update-status-response-session.dto';

@Injectable()
export class ResponseSessionService {
  constructor(
    @InjectModel(ResponseSession.name)
    private readonly responseSessionModel: Model<ResponseSessionDocument>,
    @InjectModel(Survey.name)
    private readonly surveyModel: Model<SurveyDocument>,
  ) {}

  async createNewResponseSession(dto: CreateResponseSessionDto, res: Response) {
    const specificSurvey = await this.surveyModel.findById(dto.surveyId).exec();
    if (!specificSurvey) {
      throw new NotFoundException(
        `No survey with the specific id: ${dto.surveyId}`,
      );
    }

    const obj = {
      ...dto,
      isAnonymousUser: dto.userId !== null,
      responseStatus: Response_Enum.New,
      progressPercentage: 0,
    };

    const newResponseSession = await this.responseSessionModel.create(obj);
    const response = newResponseSession.toObject();
    return res.json(response);
  }

  async updateResponseSessionStatus(
    id: string,
    dto: UpdateStatusResponseSessionDTO,
    res: Response,
  ) {
    const specificResponseSession = await this.responseSessionModel
      .findById(id)
      .exec();
    if (!specificResponseSession) {
      throw new NotFoundException(
        `No specific session with the specific id: ${id}`,
      );
    }
    const updatedResponseSession = await this.responseSessionModel
      .findByIdAndUpdate(id, { ...dto }, { new: true })
      .exec();
    return res.json(updatedResponseSession?.toObject());
  }
}
