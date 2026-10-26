import { z } from "zod";

export const baseEquipmentFields = {
  name: z
    .string()
    .trim()
    .min(1, { error: "El nombre es obligatorio" })
    .max(100, { error: "El nombre no puede superar los 100 caracteres" }),
  serialNumber: z
    .string()
    .trim()
    .min(1, { error: "La serie es obligatoria" })
    .max(50, { error: "La serie no puede superar los 50 caracteres" }),
  description: z
    .string()
    .max(255, { error: "La descripción no puede superar los 255 caracteres" })
    .optional(),
  categoryId: z.number({ error: "Seleccione una categoría" }),
  availability: z.enum(["AVAILABLE", "LOANED", "IN_MAINTENANCE", "RETIRED"], {
    error: "Seleccione la disponibilidad",
  }),
  condition: z.enum(["GOOD", "WORN", "DAMAGED"], {
    error: "Seleccione la condición",
  }),
  conditionNotes: z
    .string()
    .max(255, {
      error: "Las observaciones no pueden superar los 255 caracteres",
    })
    .optional(),
};
