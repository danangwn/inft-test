import { PaginationOptions } from '../helpers/pagination.helper';

export interface ResultInterface {
  message: string;
}

export interface Response<T> extends ResultInterface {
  data: T;
}

export interface ResultInterfaceWithData {
  message: string;
  data: any[];
}

export interface ResultPageInterface<T> {
  message: string;
  data: T[];
  total: number;
  paging: PaginationOptions;
}