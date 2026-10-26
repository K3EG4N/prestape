import { httpClient } from "./api/http-config";
import type { IApiResponse } from "@/interfaces/IApiResponse";
import type { IAdminDashboard } from "@/interfaces/IDashboard";

const admin = async () => {
  const response =
    await httpClient.get<IApiResponse<IAdminDashboard>>("/dashboard/admin");
  return response.data;
};

export const DashboardService = {
  admin,
};
