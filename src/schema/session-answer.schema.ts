import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Survey } from './survey.schema';
import { ResponseSession } from './response-session.schema';
import { User } from './user.schema';

export type SessionAnswerDocument = HydratedDocument<SessionAnswer>;

@Schema({ timestamps: true })
export class SessionAnswer {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Survey.name,
    required: true,
  })
  surveyId: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ResponseSession.name,
    required: true,
    unique: true,
  })
  responseSessionId: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: false,
    default: null,
  })
  userId?: Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    default: [],
  })
  answers: Types.ObjectId[];
}

export const SessionAnswerSchema = SchemaFactory.createForClass(SessionAnswer);
