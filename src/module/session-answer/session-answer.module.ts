import { Module } from '@nestjs/common';
import {
  SessionAnswer,
  SessionAnswerSchema,
} from '../../schema/session-answer.schema';
import { SessionAnswerController } from './controller/session-answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionAnswerService } from './service/session-answer.service';
import { Survey, SurveySchema } from '../../schema/survey.schema';
import {
  ResponseSession,
  ResponseSessionSchema,
} from '../../schema/response-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SessionAnswer.name,
        schema: SessionAnswerSchema,
      },
      {
        name: Survey.name,
        schema: SurveySchema,
      },
      {
        name: ResponseSession.name,
        schema: ResponseSessionSchema,
      },
    ]),
  ],
  controllers: [SessionAnswerController],
  providers: [SessionAnswerService],
})
export class SessionAnswerModule {}
