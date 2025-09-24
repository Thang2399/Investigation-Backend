import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class OptionDto {
  @ApiProperty({ description: 'value of the option' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  value: string;

  @ApiProperty({ description: 'label of the option', type: Object })
  @IsObject()
  @Expose()
  label: Record<string, string>;
}
