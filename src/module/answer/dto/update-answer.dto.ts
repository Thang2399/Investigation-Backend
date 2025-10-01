import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateAnswerDto {
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