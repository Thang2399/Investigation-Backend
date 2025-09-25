import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Question } from './question.schema';
import { User } from './user.schema';
import { Survey } from './survey.schema';
import { ResponseSession } from './response-session.schema';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema({ timestamps: true })
export class Answer {
  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: 'Survey',
  //   required: true,
  //   index: true,
  // })
  // surveyId: Types.ObjectId;

  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: 'Question',
  //   required: true,
  //   index: true,
  // })
  // questionId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  userId?: Types.ObjectId;

  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: ResponseSession.name,
  //   required: true,
  //   index: true,
  // })
  // responseSessionId: Types.ObjectId;

  @Prop({ required: true })
  valueString: string;

  @Prop({ type: [String], default: [] })
  chosenKey?: string[];

  @Prop({ type: Number, default: null })
  numericValue?: number;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

// Prevent duplicate answers in the same session for the same question
// AnswerSchema.index({ responseSessionId: 1, questionId: 1 }, { unique: true });