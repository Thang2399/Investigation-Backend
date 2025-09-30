import { PaginationDto } from '../../pagination/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { LayoutTypeEnum } from '../../../enum/layout.enum';
import { QuestionTypeEnum } from '../../../enum/question.enum';
import { Transform } from 'class-transformer';

export class GetListQuestionsDto extends PaginationDto {
  @ApiProperty({
    type: [String],
    default: [],
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    // if already an array (repeated query params), return it
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (Array.isArray(value)) return value;
    // if comma-separated string, split
    if (typeof value === 'string')
      return value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    return [];
  })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  surveyIds: string[] = [];

  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  questionTitle: string;

  @ApiProperty({
    enum: LayoutTypeEnum,
    default: LayoutTypeEnum.TwoRows,
    required: false,
  })
  @IsEnum(LayoutTypeEnum)
  @IsOptional()
  layout: LayoutTypeEnum;

  @ApiProperty({
    enum: QuestionTypeEnum,
    default: QuestionTypeEnum.TextField,
  })
  @IsEnum(QuestionTypeEnum)
  @IsOptional()
  questionType: QuestionTypeEnum;

  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  placeholder: string;
}
