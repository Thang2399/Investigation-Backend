import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class ValidationRulesDto {
  @ApiProperty({
    description: 'The minimum number of character of the answer',
    default: 1,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Expose()
  minLength?: number;

  @ApiProperty({
    description: 'The maximum number of character of the answer',
    default: 255,
  })
  @IsNumber()
  @Min(255)
  @IsOptional()
  @Expose()
  maxLength?: number;

  @ApiProperty({
    description: 'Is this question required?',
    default: true,
  })
  @IsBoolean()
  @Expose()
  isRequired: boolean;
}
