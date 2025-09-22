import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { LayoutTypeEnum } from '../../enum/layout.enum';
import { QuestionTypeEnum } from '../../enum/question.enum';
import { Option, OptionSchema } from './option.schema';
import { ValidationRules, ValidationRulesSchema } from './validation.schema';
import { Survey } from './survey.schema';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: Types.ObjectId, ref: Survey.name })
  surveyId?: Types.ObjectId;

  @Prop({ required: true })
  questionTitle: string;

  @Prop({ type: Object, default: {} })
  questionLabel?: Record<string, string>;

  @Prop({
    required: true,
    enum: LayoutTypeEnum,
    default: LayoutTypeEnum.TwoCols,
  })
  layout: LayoutTypeEnum;

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true, enum: QuestionTypeEnum })
  questionType: QuestionTypeEnum;

  @Prop()
  numberOfOptions?: number = 0;

  @Prop()
  placeholder?: string;

  // options only used for choice-like questions
  @Prop({ type: [OptionSchema], default: [] })
  options?: Option[];

  @Prop({ type: [ValidationRulesSchema], default: {} })
  validation?: ValidationRules;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
