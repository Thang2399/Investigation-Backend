import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';

export class DeleteSurveysDto {
  @ApiProperty({ type: [String], description: 'Array of the surveys id'})
  @IsArray()
  @IsMongoId({ each: true })
  readonly surveyIds: string[];
}
