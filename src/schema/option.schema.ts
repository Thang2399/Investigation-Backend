import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Option {
  @Prop({ required: true })
  value: string;

  @Prop({ type: String, default: '' })
  label: string;
}
export const OptionSchema = SchemaFactory.createForClass(Option);
