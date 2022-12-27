
export const createPaginationOptions = (req) => {
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 20;
  let skip = parseInt(req.query.skip, 10) || 0;
  const pagination = new PaginationOptions();

  if (page <= 0) { page = 1; }
  if (limit <= 0) { limit = 20; }
  if (skip < 0) { skip = 0; }

  pagination.page = page;
  pagination.limit = limit;
  pagination.skip = skip;
  pagination.queryPage = (page - 1) * limit;

  return pagination;
};

export class PaginationOptions {
  skip: number;
  page: number;
  limit: number;
  queryPage: number;
  data: any;
}

export class Pagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  data: any;

  constructor(results: any, total: number, pagination: PaginationOptions) {
    this.page = Number(pagination.page);
    this.limit = Number(pagination.limit);
    this.total = total;
    this.totalPage = Math.ceil(total / pagination.limit);
    this.data = results;
  }
}
