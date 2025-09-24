import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';

export class DeleteQuestionsDto {
  @ApiProperty({ type: [String], description: 'Array of questions id' })
  @IsArray()
  @IsMongoId({ each: true })
  readonly ids: string[];
}
