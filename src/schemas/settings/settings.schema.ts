import { z } from "zod";

const wholeNumber = (label: string, min: number, max: number) =>
  z
    .number({ error: `Ingrese ${label}` })
    .int({ error: "Debe ser un número entero" })
    .min(min, { error: `El mínimo es ${min}` })
    .max(max, { error: `El máximo es ${max}` });

export const settingsSchema = z.object({
  toleranceMinutes: wholeNumber("la tolerancia", 0, 240),
  maxDurationDays: wholeNumber("la duración máxima", 1, 30),
  autoCancelHours: wholeNumber("el tiempo de cancelación", 1, 72),
  minAdvanceHours: wholeNumber("la anticipación mínima", 0, 72),
  roleLimits: z.array(
    z.object({
      roleId: z.number(),
      roleLabel: z.string(),
      maxEquipments: wholeNumber("el máximo de equipos", 1, 10),
      maxActiveLoans: wholeNumber("el máximo de préstamos", 1, 10),
    }),
  ),
  businessHours: z
    .array(
      z.object({
        day: z.number(),
        open: z.boolean(),
        opensAt: z.string(),
        closesAt: z.string(),
      }),
    )
    .refine((days) => days.some((day) => day.open), {
      error: "El laboratorio debe atender al menos un día a la semana",
    }),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
