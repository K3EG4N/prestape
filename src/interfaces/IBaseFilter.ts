export interface IBaseFilters {
  search: string;
}

export interface IBaseListRequest {
  page: number;
  size: number;
  search?: string;
}
