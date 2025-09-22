import { Module } from '@nestjs/common';
import { HealthModule } from './module/health/health.module';
import { MongoModule } from './module/mongo/mongo.module';
import { ApiConfigModule } from './config/api/app-config.module';
import { QuestionModule } from './module/question/question.module';

const modules = [
  ApiConfigModule,
  HealthModule,
  MongoModule,
  QuestionModule
]

@Module({
  imports: modules,
  controllers: [],
  providers: [],
})
export class AppModule {}
