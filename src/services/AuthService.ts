import type { IApiResponse } from "@/interfaces/IApiResponse";
import type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "@/interfaces/IAuth";
import { httpClient } from "./api/http-config";

const login = async (request: ILoginRequest) => {
  const response = await httpClient.post<IApiResponse<ILoginResponse>>(
    "/auth/login",
    request,
  );

  return response.data;
};

const register = async (request: IRegisterRequest) => {
  const response = await httpClient.post<IApiResponse<IRegisterResponse>>(
    "/auth/register",
    request,
  );

  return response.data;
};

export const AuthService = {
  login,
  register,
};
