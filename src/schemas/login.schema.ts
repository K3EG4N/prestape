import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { error: "El correo electrónico es obligatorio" })
    .pipe(z.email({ error: "El correo electrónico no es válido" })),
  password: z
    .string()
    .min(1, { error: "La contraseña es obligatoria" })
    .min(6, { error: "La contraseña debe tener al menos 6 caracteres" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
