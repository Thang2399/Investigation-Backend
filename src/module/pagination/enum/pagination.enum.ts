export enum PaginationOrderByValuesEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export enum BooleanValuesEnum {
  True = 'true',
  False = 'false',
}

export enum PaginationDefaultEnum {
  Current_Page = 1,
  Page_Size = 15,
  Order_By = PaginationOrderByValuesEnum.ASC,
  Order_Type = 'updatedAt',
}
