import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationDefaultEnum } from '../enum/pagination.enum';

@Injectable()
export class PaginationService {
  constructor() {}
  async getPaginationData(model: Model<any>, query: any, queryOptions?: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      page = PaginationDefaultEnum.Current_Page,
      pageSize = PaginationDefaultEnum.Page_Size,
      orderBy = PaginationDefaultEnum.Order_By,
    } = query;

    const skip = (page - 1) * pageSize;

    const sortOptions = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      orderType: orderBy || PaginationDefaultEnum.Order_By,
    };

    const result = await model
      .find(queryOptions)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .exec();

    const totalCount = (await model.countDocuments(queryOptions)) || 0;
    const totalPages = Math.ceil(totalCount / pageSize) || 0;

    return {
      data: result,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      page,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      pageSize,
      totalCount,
      totalPages,
    };
  }
}
