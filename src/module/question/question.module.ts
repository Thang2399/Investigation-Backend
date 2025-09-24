import { Module } from '@nestjs/common';
import { QuestionController } from './controller/question.controller';
import { QuestionService } from './service/question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from '../../schema/question.schema';
import { Survey, SurveySchema } from '../../schema/survey.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
      {
        name: Survey.name,
        schema: SurveySchema,
      },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
