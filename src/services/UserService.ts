import type { IApiResponse, IPageResponse } from "@/interfaces/IApiResponse";
import type {
  ICreateUserRequest,
  IUpdateUserRequest,
  IUser,
  IUserFilterParams,
  IUserListRequest,
} from "@/interfaces/IUser";
import { httpClient } from "./api/http-config";

const list = async (request: IUserListRequest, signal?: AbortSignal) => {
  const response = await httpClient.get<IApiResponse<IPageResponse<IUser>>>(
    "/users",
    {
      params: request,
      paramsSerializer: { indexes: null },
      signal,
    },
  );

  return response.data;
};

const create = async (request: ICreateUserRequest) => {
  const response = await httpClient.post<IApiResponse>("/users", request);

  return response.data;
};

const update = async (id: number, request: IUpdateUserRequest) => {
  const response = await httpClient.put<IApiResponse>(`/users/${id}`, request);

  return response.data;
};

const suspend = async (id: number) => {
  const response = await httpClient.put<IApiResponse>(`/users/${id}/suspend`);

  return response.data;
};

const reactivate = async (id: number) => {
  const response = await httpClient.put<IApiResponse>(
    `/users/${id}/reactivate`,
  );

  return response.data;
};

const exportExcel = async (params: IUserFilterParams) => {
  const response = await httpClient.get<Blob>("/users/export", {
    params,
    paramsSerializer: { indexes: null },
    responseType: "blob",
  });

  return {
    blob: response.data,
    disposition: response.headers["content-disposition"] as string | undefined,
  };
};

export const UserService = {
  list,
  create,
  update,
  suspend,
  reactivate,
  exportExcel,
};
