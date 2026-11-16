import type { SettingsSchema } from "@/schemas/settings/settings.schema";

export const SETTINGS_TIME_FORMAT = "HH:mm";
export const SETTINGS_MINUTE_STEP = 15;

const weekday = (day: number, label: string, closesAt = "20:00") => ({
  day,
  label,
  open: true,
  opensAt: "08:00",
  closesAt,
});

export const SETTINGS_DEFAULT_VALUES: SettingsSchema = {
  toleranceMinutes: 45,
  maxDurationDays: 3,
  autoCancelHours: 2,
  minAdvanceHours: 1,
  roleLimits: [
    {
      roleName: "STUDENT",
      roleLabel: "Alumno",
      maxEquipments: 2,
      maxActiveLoans: 1,
    },
    {
      roleName: "TEACHER",
      roleLabel: "Docente",
      maxEquipments: 4,
      maxActiveLoans: 3,
    },
  ],
  businessHours: [
    weekday(1, "Lunes"),
    weekday(2, "Martes"),
    weekday(3, "Miércoles"),
    weekday(4, "Jueves"),
    weekday(5, "Viernes"),
    weekday(6, "Sábado", "13:00"),
    { ...weekday(7, "Domingo", "13:00"), open: false },
  ],
};
