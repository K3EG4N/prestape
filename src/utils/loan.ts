import dayjs from "dayjs";
import { toInstantRange } from "@/utils/date";
import type {
  ILoanFilterParams,
  ILoanFilters,
  ILendableEquipmentOption,
  ILendableKitOption,
} from "@/interfaces/ILoan";

export const isLate = (scheduledAt: string, actualAt: string | null) =>
  actualAt !== null && dayjs(actualAt).isAfter(scheduledAt);

export const buildLoanFilterParams = (
  filters: ILoanFilters,
): ILoanFilterParams => {
  const pickup = toInstantRange(filters.scheduledPickupAt);
  const scheduledReturn = toInstantRange(filters.scheduledReturnAt);

  return {
    search: filters.search || undefined,
    statuses: filters.statuses,
    pickupFrom: pickup.from,
    pickupTo: pickup.to,
    returnFrom: scheduledReturn.from,
    returnTo: scheduledReturn.to,
  };
};

export const getSelectedLoanItems = (
  equipments: ILendableEquipmentOption[],
  kits: ILendableKitOption[],
  kitId?: number,
): ILendableEquipmentOption[] => {
  const kitItems = kits.find((kit) => kit.id === kitId)?.items ?? [];

  return [...equipments, ...kitItems];
};
