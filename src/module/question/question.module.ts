import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [],
})
export class QuestionModule {}
