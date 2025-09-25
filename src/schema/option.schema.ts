import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Option {
  @Prop({ required: true })
  value: string;

  @Prop({ type: Object, default: {} })
  label: Record<string, string>;
}
export const OptionSchema = SchemaFactory.createForClass(Option);
