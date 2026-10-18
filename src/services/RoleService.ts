import type { IApiResponse } from "@/interfaces/IApiResponse";
import type { IRole } from "@/interfaces/IRole";
import { httpClient } from "./api/http-config";

const list = async () => {
  const response = await httpClient.get<IApiResponse<IRole[]>>("/roles");
  return response.data;
};

export const RoleService = {
  list,
};
