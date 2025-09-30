import { Module } from '@nestjs/common';
import { Survey, SurveySchema } from '../../schema/survey.schema';
import { Question, QuestionSchema } from '../../schema/question.schema';
import { User, UserSchema } from '../../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ResponseSession,
  ResponseSessionSchema,
} from '../../schema/response-session.schema';
import { Answer, AnswerSchema } from '../../schema/answer.schema';
import { AnswerController } from './controller/answer.controller';
import { AnswerService } from './service/answer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Survey.name,
        schema: SurveySchema,
      },
      {
        name: Question.name,
        schema: QuestionSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ResponseSession.name,
        schema: ResponseSessionSchema,
      },
      {
        name: Answer.name,
        schema: AnswerSchema,
      },
    ]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
