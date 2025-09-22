import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ValidationRules {
  @Prop()
  minLength?: number = 1;

  @Prop()
  maxLength?: number = 255;

  @Prop()
  isRequired?: boolean = true;
}

export const ValidationRulesSchema =
  SchemaFactory.createForClass(ValidationRules);
