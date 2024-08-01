export type PaginatedData<T> = {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  //rename to data
  records: T[];
};

export type PaginatedRequest = {
  sort_by: string;
  sort_order: string;
  page: string;
  per_page: string;
};
