import { httpClient } from "./api/http-config";
import type { IApiResponse, IPageResponse } from "@/interfaces/IApiResponse";
import type {
  ICreateEquipmentRequest,
  IEquipment,
  IEquipmentListRequest,
  IEquipmentOption,
  IUpdateEquipmentRequest,
} from "@/interfaces/IEquipment";

const list = async (request: IEquipmentListRequest, signal?: AbortSignal) => {
  const response = await httpClient.get<
    IApiResponse<IPageResponse<IEquipment>>
  >("/equipments", {
    params: request,
    paramsSerializer: { indexes: null },
    signal,
  });

  return response.data;
};

const options = async (kitId?: number) => {
  const response = await httpClient.get<IApiResponse<IEquipmentOption[]>>(
    "/equipments/options",
    { params: { kitId } },
  );
  return response.data;
};

const create = async (request: ICreateEquipmentRequest) => {
  const response = await httpClient.post<IApiResponse>("/equipments", request);
  return response.data;
};

const update = async (id: number, request: IUpdateEquipmentRequest) => {
  const response = await httpClient.put<IApiResponse>(
    `/equipments/${id}`,
    request,
  );
  return response.data;
};

const remove = async (id: number) => {
  const response = await httpClient.delete<IApiResponse>(`/equipments/${id}`);
  return response.data;
};

export const EquipmentService = {
  list,
  options,
  create,
  update,
  remove,
};
