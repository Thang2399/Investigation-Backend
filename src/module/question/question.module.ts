import { Module } from '@nestjs/common';
import { QuestionController } from './controller/question.controller';
import { QuestionService } from './service/question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from '../../schema/question.schema';
import { Survey, SurveySchema } from '../../schema/survey.schema';
import {
  ResponseSession,
  ResponseSessionSchema,
} from '../../schema/response-session.schema';
import { ResponseSessionService } from '../response-session/service/response-session.service';
import { ResponseSessionModule } from '../response-session/response-session.module';
import { SurveyModule } from '../survey/survey.module';

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
    ResponseSessionModule,
    SurveyModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
