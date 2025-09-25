import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema({ timestamps: true })
export class Survey {
  @Prop({ required: true })
  surveyTitle: string;

  @Prop({ required: true, min: 1, max: 15 })
  numberOfQuestions: number;

  @Prop({ type: Boolean, default: false })
  isLimitedSurvey?: boolean;

  @Prop({ required: true, type: [String], default: [] })
  questions: string[];

  @Prop({
    required: function (this: SurveyDocument) {
      // `this` is the document being validated
      return !!this.isLimitedSurvey;
    },
    type: Date,
  })
  expiredAt?: Date;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
