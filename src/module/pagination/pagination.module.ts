import { Module } from '@nestjs/common';
import { PaginationService } from './service/pagination.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PaginationService],
})
export class PaginationModule {}
