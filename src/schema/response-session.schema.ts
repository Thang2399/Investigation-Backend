import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Survey } from './survey.schema';
import { Response_Enum } from '../enum/index.enum';
import { User } from './user.schema';
import { Question } from './question.schema';

export type ResponseSessionDocument = HydratedDocument<ResponseSession>;

@Schema({ timestamps: true })
export class ResponseSession {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Survey.name })
  surveyId?: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  userId?: Types.ObjectId;

  @Prop({ enum: Response_Enum, default: Response_Enum.New })
  responseStatus: Response_Enum;

  @Prop({ type: Boolean, default: true })
  isAnonymousUser: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Question.name })
  lastQuestionId?: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  progressPercentage?: number = 0;

  @Prop({ type: Date, required: false })
  expiredAt?: Date;

  @Prop({ type: Date, required: false })
  submittedAt?: Date;
}

export const ResponseSessionSchema =
  SchemaFactory.createForClass(ResponseSession);
