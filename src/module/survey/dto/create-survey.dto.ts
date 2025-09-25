import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { SurveyDocument } from '../../../schema/survey.schema';

export class CreateSurveyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  surveyTitle: string;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  @IsOptional()
  @Expose()
  isLimitedSurvey?: boolean;

  @ApiProperty({ type: [String], default: [] })
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @Expose()
  questions: string[];

  @ApiProperty({ default: '' })
  @ValidateIf((o: SurveyDocument) => o.isLimitedSurvey === true)
  @IsISO8601()
  @Expose()
  expiredAt?: string;
}
