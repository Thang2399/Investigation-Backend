import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './question.schema';
import { Answer, AnswerSchema } from './answer.schema';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema({ timestamps: true })
export class Survey {
  @Prop({ required: true })
  surveyTitle: string;

  @Prop({ required: true, min: 1, max: 15 })
  numberOfQuestions: number;

  @Prop()
  isLimitedSurvey?: boolean = false;

  @Prop({ required: true, type: [QuestionSchema] })
  questions: Question[];

  @Prop({ required: true, type: [AnswerSchema] })
  answers: Answer[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
