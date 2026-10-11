import { z } from "zod";

export const registerschema = z.object({
  type: z.enum(["student", "teacher"], {
    error: "El tipo de usuario es obligatorio",
  }),
  email: z
    .string()
    .min(1, { error: "El correo electrónico es obligatorio" })
    .email({ error: "El correo electrónico no es válido" }),
  password: z
    .string()
    .min(1, { error: "La contraseña es obligatoria" })
    .min(6, { error: "La contraseña debe ser de 6 caracteres" }),
  confirmPassword: z
    .string()
    .min(1, { error: "La confirmación de contraseña es obligatoria" })
    .min(6, {
      error: "La confirmación debe ser de 6 caracteres",
    }),
});

export type RegisterSchema = z.infer<typeof registerschema>;
