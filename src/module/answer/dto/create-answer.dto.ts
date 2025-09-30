import { ApiProperty } from '@nestjs/swagger';
import { Types, Schema as MongooseSchema } from 'mongoose';
import {
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateAnswerDto {
  @ApiProperty({
    type: MongooseSchema.Types.ObjectId,
    default: null,
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  @Expose()
  surveyId: Types.ObjectId;

  @ApiProperty({
    type: MongooseSchema.Types.ObjectId,
    default: null,
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  @Expose()
  responseSessionId: Types.ObjectId;

  @ApiProperty({
    type: MongooseSchema.Types.ObjectId,
    default: null,
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  @Expose()
  sessionAnswerId: Types.ObjectId;

  @ApiProperty({
    type: MongooseSchema.Types.ObjectId,
    default: null,
    required: true,
  })
  @IsNotEmpty()
  @IsMongoId()
  @Expose()
  questionId: Types.ObjectId;

  @ApiProperty({
    type: MongooseSchema.Types.ObjectId,
    default: null,
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  @Expose()
  userId?: Types.ObjectId;

  @ApiProperty({
    type: String,
    required: true,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  valueString: string;

  @ApiProperty({
    type: [String],
    required: false,
    default: [],
  })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @Expose()
  chosenKey: string[];

  @ApiProperty({
    type: Number,
    default: 0,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Expose()
  numericValue?: number;
}
