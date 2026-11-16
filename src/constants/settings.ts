import type { SettingsSchema } from "@/schemas/settings/settings.schema";

export const SETTINGS_TIME_FORMAT = "HH:mm";
export const SETTINGS_MINUTE_STEP = 15;

export const SETTINGS_DAY_LABELS: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

export const EMPTY_SETTINGS_VALUES: SettingsSchema = {
  toleranceMinutes: 0,
  maxDurationDays: 1,
  autoCancelHours: 1,
  minAdvanceHours: 0,
  roleLimits: [],
  businessHours: [],
};
