import { httpClient } from "./api/http-config";
import type { IBaseListRequest } from "@/interfaces/IBaseFilter";
import type { IApiResponse, IPageResponse } from "@/interfaces/IApiResponse";
import type {
  ICategory,
  ICategoryOption,
  IUpdateCategoryRequest,
} from "@/interfaces/ICatalog";

const list = async (request: IBaseListRequest, signal?: AbortSignal) => {
  const response = await httpClient.get<IApiResponse<IPageResponse<ICategory>>>(
    "/equipment-categories",
    {
      params: request,
      paramsSerializer: { indexes: null },
      signal,
    },
  );

  return response.data;
};

const options = async () => {
  const response = await httpClient.get<IApiResponse<ICategoryOption[]>>(
    "/equipment-categories/options",
  );
  return response.data;
};

const update = async (id: number, request: IUpdateCategoryRequest) => {
  const response = await httpClient.put<IApiResponse>(
    `/equipment-categories/${id}`,
    request,
  );
  return response.data;
};

const remove = async (id: number) => {
  const response = await httpClient.delete<IApiResponse>(
    `/equipment-categories/${id}`,
  );
  return response.data;
};

export const CategoryService = {
  list,
  options,
  update,
  remove,
};
