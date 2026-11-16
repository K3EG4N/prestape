import { httpClient } from "./api/http-config";
import type { IApiResponse } from "@/interfaces/IApiResponse";
import type { ISettings, IUpdateSettingsRequest } from "@/interfaces/ISettings";

const get = async (signal?: AbortSignal) => {
  const response = await httpClient.get<IApiResponse<ISettings>>("/settings", {
    signal,
  });
  return response.data;
};

const update = async (request: IUpdateSettingsRequest) => {
  const response = await httpClient.put<IApiResponse>("/settings", request);
  return response.data;
};

export const SettingsService = {
  get,
  update,
};
