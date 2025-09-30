import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AnswerDocument, Answer } from '../../../schema/answer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { Response } from 'express';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name)
    private readonly answerModel: Model<AnswerDocument>,
  ) {}

  async createNewAnswer(dto: CreateAnswerDto, res: Response) {
    const newAnswer = await this.answerModel.create(dto);
    return res.json(newAnswer.toObject());
  }
}
