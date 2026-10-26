import { httpClient } from "./api/http-config";
import type { IApiResponse, IPageResponse } from "@/interfaces/IApiResponse";
import type {
  ICreateKitRequest,
  IKit,
  IKitListRequest,
  IUpdateKitRequest,
} from "@/interfaces/IKit";

const list = async (request: IKitListRequest, signal?: AbortSignal) => {
  const response = await httpClient.get<IApiResponse<IPageResponse<IKit>>>(
    "/kits",
    {
      params: request,
      paramsSerializer: { indexes: null },
      signal,
    },
  );

  return response.data;
};

const create = async (request: ICreateKitRequest) => {
  const response = await httpClient.post<IApiResponse>("/kits", request);
  return response.data;
};

const update = async (id: number, request: IUpdateKitRequest) => {
  const response = await httpClient.put<IApiResponse>(`/kits/${id}`, request);
  return response.data;
};

const remove = async (id: number) => {
  const response = await httpClient.delete<IApiResponse>(`/kits/${id}`);
  return response.data;
};

export const KitService = {
  list,
  create,
  update,
  remove,
};
