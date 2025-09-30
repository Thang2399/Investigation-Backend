import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  PaginationDefaultEnum,
  PaginationOrderByValuesEnum,
} from '../enum/pagination.enum';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @ApiProperty({
    type: Number,
    default: PaginationDefaultEnum.Current_Page,
  })
  page?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    type: Number,
    default: PaginationDefaultEnum.Page_Size,
  })
  pageSize?: number;

  @IsOptional()
  @IsEnum(PaginationOrderByValuesEnum)
  @ApiProperty({
    enum: PaginationOrderByValuesEnum,
    default: PaginationOrderByValuesEnum.ASC,
  })
  orderBy?: PaginationOrderByValuesEnum;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    default: 'updatedAt',
  })
  orderType?: string;
}
