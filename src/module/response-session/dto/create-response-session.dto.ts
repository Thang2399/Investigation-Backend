import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateResponseSessionDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsMongoId()
  @Expose()
  surveyId: string;

  @ApiProperty({ default: null })
  @IsOptional()
  @IsMongoId()
  @Expose()
  userId: string;
}
