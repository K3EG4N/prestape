export interface IApiResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  value: T;
}
