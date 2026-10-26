import { z } from "zod";

export const baseKitFields = {
  name: z
    .string()
    .trim()
    .min(1, { error: "El nombre es obligatorio" })
    .max(100, { error: "El nombre no puede superar los 100 caracteres" }),
  description: z
    .string()
    .max(255, { error: "La descripción no puede superar los 255 caracteres" })
    .optional(),
  equipmentIds: z
    .array(z.number())
    .min(1, { error: "Seleccione al menos un equipo" }),
};
