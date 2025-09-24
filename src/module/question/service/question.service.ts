import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from '../../../schema/question.schema';
import { Model } from 'mongoose';
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
    return await this.questionModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
