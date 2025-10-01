import { PaginationDto } from '../../pagination/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class GetListAnswersDto extends PaginationDto {
  @ApiProperty({
    type: MongooseSchema.Types.ObjectId,
    default: null,
    required: false
  })
  @IsOptional()
  @IsMongoId()
  surveyId: Types.ObjectId;

  @ApiProperty({
    type: MongooseSchema.Types.ObjectId,
    default: null,
    required: false
  })
  @IsOptional()
  @IsMongoId()
  questionId: Types.ObjectId;

  @ApiProperty({
    type: MongooseSchema.Types.ObjectId,
    default: null,
    required: false
  })
  @IsOptional()
  @IsMongoId()
  userId: Types.ObjectId;

  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  valueString: string;
}