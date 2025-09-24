import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { LayoutTypeEnum } from '../../../enum/layout.enum';
import { QuestionTypeEnum } from '../../../enum/question.enum';
import { OptionDto } from './option.dto';
import { ValidationRulesDto } from './validation-rules.dto';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'List survey use this question',
    required: false,
    type: [String],
    default: [],
  })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @Expose()
  surveyIds?: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  questionTitle: string;

  @IsOptional()
  @IsEnum(LayoutTypeEnum)
  @ApiProperty({
    enum: LayoutTypeEnum,
    default: LayoutTypeEnum.TwoCols,
    required: false,
  })
  @Expose()
  layout?: LayoutTypeEnum;

  @IsOptional()
  @IsEnum(QuestionTypeEnum)
  @ApiProperty({
    enum: QuestionTypeEnum,
    default: QuestionTypeEnum.TextField,
    required: true,
  })
  @Expose()
  questionType: QuestionTypeEnum;

  @IsOptional()
  @IsString()
  @ApiProperty({
    default: '',
  })
  @Expose()
  placeholder?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    default: 0,
  })
  @Min(0)
  @Max(10)
  @Expose()
  numberOfOptions: number;

  @ApiProperty({
    description: 'list options',
    required: false,
    type: [OptionDto],
    default: [],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @Expose()
  options?: OptionDto[];

  @ApiProperty({
    description: 'validation rules for the answer',
    required: false,
    type: ValidationRulesDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ValidationRulesDto)
  @Expose()
  validation?: ValidationRulesDto;
}
