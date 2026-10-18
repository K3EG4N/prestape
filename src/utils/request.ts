import type { IBaseFilters, IBaseListRequest } from "@/interfaces/IBaseFilter";

export const buildBaseRequest = (
  page: number,
  size: number,
  filters: IBaseFilters,
): IBaseListRequest => ({
  page,
  size,
  search: filters.search || undefined,
});
