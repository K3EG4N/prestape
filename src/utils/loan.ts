import type { Dayjs } from "dayjs";
import { toInstantRange } from "@/utils/date";
import type { ISettingsBusinessDay } from "@/interfaces/ISettings";
import type {
  ILoanFilterParams,
  ILoanFilters,
  ILendableEquipmentOption,
  ILendableKitOption,
} from "@/interfaces/ILoan";

const LOAN_TIME_FORMAT = "HH:mm";

const toIsoWeekday = (date: Dayjs) => (date.day() === 0 ? 7 : date.day());

const toHourAndMinute = (time: string) => time.split(":").map(Number);

const range = (start: number, end: number) =>
  Array.from({ length: Math.max(end - start, 0) }, (_, index) => start + index);

export const findBusinessDay = (days: ISettingsBusinessDay[], date: Dayjs) =>
  days.find((day) => day.day === toIsoWeekday(date));

export const isClosedDay = (days: ISettingsBusinessDay[], date: Dayjs) =>
  days.length > 0 && !findBusinessDay(days, date)?.open;

export const isWithinBusinessHours = (
  days: ISettingsBusinessDay[],
  date: Dayjs,
) => {
  const day = findBusinessDay(days, date);
  if (!day?.open) return false;

  const time = date.format(LOAN_TIME_FORMAT);
  return time >= day.opensAt && time <= day.closesAt;
};

export const getBusinessDisabledTime = (
  days: ISettingsBusinessDay[],
  date: Dayjs | null,
) => {
  const day = date ? findBusinessDay(days, date) : undefined;
  if (!day?.open) return {};

  const [opensHour, opensMinute] = toHourAndMinute(day.opensAt);
  const [closesHour, closesMinute] = toHourAndMinute(day.closesAt);

  return {
    disabledHours: () => [...range(0, opensHour), ...range(closesHour + 1, 24)],
    disabledMinutes: (hour: number) => {
      if (hour === opensHour) return range(0, opensMinute);
      if (hour === closesHour) return range(closesMinute + 1, 60);
      return [];
    },
  };
};

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
