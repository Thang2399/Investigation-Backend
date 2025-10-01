import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from '../../schema/survey.schema';
import { Question, QuestionSchema } from '../../schema/question.schema';
import { User, UserSchema } from '../../schema/user.schema';
import {
  ResponseSession,
  ResponseSessionSchema,
} from '../../schema/response-session.schema';
import { SurveyController } from './controller/survey.controller';
import { SurveyService } from './service/survey.service';
import { QuestionService } from '../question/service/question.service';
import { ResponseSessionModule } from '../response-session/response-session.module';
import { PaginationService } from '../pagination/service/pagination.service';
import { Answer, AnswerSchema } from '../../schema/answer.schema';

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
    ResponseSessionModule,
    SurveyModule
  ],
  providers: [SurveyService, QuestionService, PaginationService],
  controllers: [SurveyController],
})
export class SurveyModule {}
