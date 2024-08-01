export type PaginatedData<T> = {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  data: T[];
};

export type PaginatedRequest = {
  sort_by: string;
  sort_order: string;
  page: string;
  per_page: string;
  search?: string;
  user_id?: string;
};
