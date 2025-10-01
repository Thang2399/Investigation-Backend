import { PaginationDto } from '../../pagination/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BooleanValuesEnum } from '../../pagination/enum/pagination.enum';

export class GetListSurveysDto extends PaginationDto {
  @ApiProperty({
    type: String,
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  surveyTitle: string;

  @ApiProperty({
    type: Number,
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(15)
  numberOfQuestions: number;

  @ApiProperty({
    enum: BooleanValuesEnum,
    default: BooleanValuesEnum.False,
    required: false,
  })
  @IsEnum(BooleanValuesEnum)
  isLimitedSurvey: BooleanValuesEnum;

  @ApiProperty({
    type: [String],
    default: [],
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean);
    }
    return [];
  })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  questions: string[];
}
