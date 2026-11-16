import type {
  ISettings,
  ISettingsBusinessDay,
  IUpdateSettingsRequest,
} from "@/interfaces/ISettings";
import type { SettingsSchema } from "@/schemas/settings/settings.schema";

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const getWeeklyHoursSummary = (days: ISettingsBusinessDay[]) => {
  const openDays = days.filter((day) => day.open);
  const minutes = openDays.reduce(
    (total, day) =>
      total + Math.max(toMinutes(day.closesAt) - toMinutes(day.opensAt), 0),
    0,
  );
  const hours = Math.round((minutes / 60) * 10) / 10;

  return `Abierto ${openDays.length} ${openDays.length === 1 ? "día" : "días"} · ${hours} h a la semana`;
};

export const toSettingsFormValues = (settings: ISettings): SettingsSchema => ({
  toleranceMinutes: settings.toleranceMinutes,
  maxDurationDays: settings.maxDurationDays,
  minAdvanceHours: settings.minAdvanceHours,
  autoCancelHours: settings.autoCancelHours,
  roleLimits: settings.roleLimits.map((limit) => ({
    roleId: limit.roleId,
    roleLabel: limit.roleLabel,
    maxEquipments: limit.maxEquipments,
    maxActiveLoans: limit.maxActiveLoans,
  })),
  businessHours: settings.businessHours.map((day) => ({ ...day })),
});

export const toUpdateSettingsRequest = (
  data: SettingsSchema,
): IUpdateSettingsRequest => ({
  toleranceMinutes: data.toleranceMinutes,
  maxDurationDays: data.maxDurationDays,
  minAdvanceHours: data.minAdvanceHours,
  autoCancelHours: data.autoCancelHours,
  roleLimits: data.roleLimits.map((limit) => ({
    roleId: limit.roleId,
    maxEquipments: limit.maxEquipments,
    maxActiveLoans: limit.maxActiveLoans,
  })),
  businessHours: data.businessHours,
});
