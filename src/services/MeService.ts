import type { IApiResponse } from "@/interfaces/IApiResponse";
import type { IUserProfile } from "@/interfaces/IUserProfile";
import type { ICreatePersonRequest } from "@/interfaces/IPerson";
import { httpClient } from "./api/http-config";

const getMe = async () => {
  const response = await httpClient.get<IApiResponse<IUserProfile>>("/me");
  return response.data;
};

const completeProfile = async (request: ICreatePersonRequest) => {
  const response = await httpClient.post<IApiResponse>("/me/profile", request);
  return response.data;
};

export const MeService = {
  getMe,
  completeProfile,
};
