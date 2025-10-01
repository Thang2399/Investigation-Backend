import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AnswerDocument, Answer } from '../../../schema/answer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Response } from 'express';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { GetListAnswersDto } from '../dto/get-list-answers.dto';
import { PaginationService } from '../../pagination/service/pagination.service';
import { convertTextToRegex, getQueryOptions } from '../../../utils';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name)
    private readonly answerModel: Model<AnswerDocument>,
    private readonly paginationService: PaginationService,
  ) {}

  async getListAnswers(query: GetListAnswersDto, res: Response) {
    const rawObjData = {
      surveyId: query.surveyId,
      questionId: query.questionId,
      userId: query.userId,
      valueString: convertTextToRegex(query.valueString)
    };

    const queryOptions: Record<string, any> = getQueryOptions(rawObjData);

    const listAnswers = await this.paginationService.getPaginationData(
      this.answerModel,
      query,
      queryOptions,
    );
    return res.json(listAnswers);
  }

  async getDetailAnswer(id: string, res: Response) {
    const specificAnswer = await this.answerModel
      .findById(id)
      .populate('surveyId', 'surveyTitle')
      .populate('questionId', 'questionTitle')
      .populate('userId', 'userEmail')
      .lean()
      .exec();
    if (!specificAnswer) {
      throw new NotFoundException(`No specific answer with id ${id}`);
    }

    return res.json(specificAnswer);
  }

  async createNewAnswer(dto: CreateAnswerDto, res: Response) {
    const newAnswer = await this.answerModel.create(dto);
    return res.json(newAnswer.toObject());
  }

  async updateAnswer(id: string, dto: UpdateAnswerDto, res: Response) {
    const updatedAnswer = await this.answerModel
      .findByIdAndUpdate(id, { ...dto }, { new: true })
      .exec();

    return res.json(updatedAnswer);
  }
}
