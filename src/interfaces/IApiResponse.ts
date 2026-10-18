export interface IApiResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  value: T;
}

export interface IPageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
