import { httpClient } from "./api/http-config";
import type { IApiResponse, IPageResponse } from "@/interfaces/IApiResponse";
import type {
  ICreateLoanRequest,
  ILendableEquipmentOption,
  ILendableKitOption,
  ILoan,
  ILoanListRequest,
  ILoanRequesterOption,
  ILoanRules,
  IRegisterPickupRequest,
  IRegisterReturnRequest,
} from "@/interfaces/ILoan";

const list = async (request: ILoanListRequest, signal?: AbortSignal) => {
  const response = await httpClient.get<IApiResponse<IPageResponse<ILoan>>>(
    "/loans",
    {
      params: request,
      paramsSerializer: { indexes: null },
      signal,
    },
  );

  return response.data;
};

const create = async (request: ICreateLoanRequest) => {
  const response = await httpClient.post<IApiResponse>("/loans", request);
  return response.data;
};

const registerPickup = async (id: number, request: IRegisterPickupRequest) => {
  const response = await httpClient.put<IApiResponse>(
    `/loans/${id}/pickup`,
    request,
  );
  return response.data;
};

const registerReturn = async (id: number, request: IRegisterReturnRequest) => {
  const response = await httpClient.put<IApiResponse>(
    `/loans/${id}/return`,
    request,
  );
  return response.data;
};

const cancel = async (id: number) => {
  const response = await httpClient.put<IApiResponse>(`/loans/${id}/cancel`);
  return response.data;
};

const rules = async () => {
  const response =
    await httpClient.get<IApiResponse<ILoanRules>>("/loans/rules");
  return response.data;
};

const requesterOptions = async () => {
  const response = await httpClient.get<IApiResponse<ILoanRequesterOption[]>>(
    "/loans/options/requesters",
  );
  return response.data;
};

const equipmentOptions = async (search?: string, signal?: AbortSignal) => {
  const response = await httpClient.get<
    IApiResponse<ILendableEquipmentOption[]>
  >("/loans/options/equipments", { params: { search }, signal });
  return response.data;
};

const kitOptions = async () => {
  const response = await httpClient.get<IApiResponse<ILendableKitOption[]>>(
    "/loans/options/kits",
  );
  return response.data;
};

export const LoanService = {
  list,
  create,
  registerPickup,
  registerReturn,
  cancel,
  rules,
  requesterOptions,
  equipmentOptions,
  kitOptions,
};
