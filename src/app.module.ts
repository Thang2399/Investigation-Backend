import { Module } from '@nestjs/common';
import { HealthModule } from './module/health/health.module';
import { MongoModule } from './module/mongo/mongo.module';
import { ApiConfigModule } from './config/api/app-config.module';
import { QuestionModule } from './module/question/question.module';
import { AnswerModule } from './module/answer/answer.module';
import { ResponseSessionModule } from './module/response-session/response-session.module';
import { UserModule } from './module/user/user.module';
import { SurveyModule } from './module/survey/survey.module';

const modules = [
  ApiConfigModule,
  HealthModule,
  MongoModule,
  QuestionModule,
  AnswerModule,
  ResponseSessionModule,
  UserModule,
  SurveyModule,
];

@Module({
  imports: modules,
  controllers: [],
  providers: [],
})
export class AppModule {}
