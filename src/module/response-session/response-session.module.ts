import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from '../../schema/survey.schema';
import { User, UserSchema } from '../../schema/user.schema';
import {
  ResponseSession,
  ResponseSessionSchema,
} from '../../schema/response-session.schema';
import { ResponseSessionService } from './service/response-session.service';
import { ResponseSessionController } from './controller/response-session.controller';
import { Question, QuestionSchema } from '../../schema/question.schema';
import { SurveyService } from '../survey/service/survey.service';
import { QuestionService } from '../question/service/question.service';
import { PaginationService } from '../pagination/service/pagination.service';
import { Answer, AnswerSchema } from '../../schema/answer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Survey.name,
        schema: SurveySchema,
      },
      { name: Question.name, schema: QuestionSchema },
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
  providers: [
    ResponseSessionService,
    SurveyService,
    QuestionService,
    PaginationService,
  ],
  controllers: [ResponseSessionController],
})
export class ResponseSessionModule {}
