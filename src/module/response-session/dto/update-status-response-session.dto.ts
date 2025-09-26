import { ApiProperty } from '@nestjs/swagger';
import { Response_Enum } from '../../../enum/index.enum';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateStatusResponseSessionDTO {
  @ApiProperty({
    enum: Response_Enum,
    default: Response_Enum.In_Progress,
    required: true,
  })
  @IsEnum(Response_Enum)
  @Expose()
  responseStatus: Response_Enum;

  @ApiProperty({
    default: 0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Expose()
  progressPercentage: number;
}