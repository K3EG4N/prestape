import type { IPageResponse } from "@/interfaces/IApiResponse";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = [15, 25, 50];

export const EMPTY_PAGE: IPageResponse<never> = {
  content: [],
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  totalElements: 0,
  totalPages: 0,
};
