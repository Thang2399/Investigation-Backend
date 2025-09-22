import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender_Enum } from '../../enum/index.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  age: number;

  @Prop({ enum: Gender_Enum, default: Gender_Enum.Male })
  gender: Gender_Enum;

  @Prop()
  userEmail?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
