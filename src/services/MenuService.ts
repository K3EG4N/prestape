import type { IApiResponse } from "@/interfaces/IApiResponse";
import { httpClient } from "./api/http-config";
import type { IMenuItem } from "@/interfaces/IMenu";

const getMenuItems = async () => {
  const response = await httpClient.get<IApiResponse<IMenuItem[]>>("/menu-item");
  return response.data;
};

export const MenuService = {
  getMenuItems,
};
