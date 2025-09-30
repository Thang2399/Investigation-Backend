import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { Expose } from 'class-transformer';

export class CreateSessionAnswerDto {
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
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  @Expose()
  userId?: Types.ObjectId;
}
