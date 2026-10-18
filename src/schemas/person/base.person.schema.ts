import { z } from "zod";

export const basePersonFields = {
  firstName: z
    .string()
    .trim()
    .min(1, { error: "El nombre es obligatorio" })
    .max(100, { error: "El nombre no puede superar los 100 caracteres" }),
  middleName: z
    .string()
    .trim()
    .max(50, { error: "El segundo nombre no puede superar los 50 caracteres" })
    .optional(),
  paternalSurname: z
    .string()
    .trim()
    .min(1, { error: "El apellido paterno es obligatorio" })
    .max(100, { error: "El apellido paterno no puede superar los 100 caracteres" }),
  maternalSurname: z
    .string()
    .trim()
    .max(50, { error: "El apellido materno no puede superar los 50 caracteres" })
    .optional(),
  documentNumber: z
    .string()
    .min(1, { error: "El DNI es obligatorio" })
    .regex(/^\d{8}$/, { error: "El DNI debe tener 8 dígitos" }),
  phone: z
    .string()
    .min(1, { error: "El celular es obligatorio" })
    .regex(/^\d{9}$/, { error: "El celular debe tener 9 dígitos" }),
};
