import { z } from "zod";

export const baseUserFields = {
  email: z
    .string()
    .min(1, { error: "El correo electrónico es obligatorio" })
    .max(100, {
      error: "El correo electrónico no puede superar los 100 caracteres",
    })
    .pipe(z.email({ error: "El correo electrónico no es válido" })),
  password: z
    .string()
    .min(1, { error: "La contraseña es obligatoria" })
    .min(6, { error: "La contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z
    .string()
    .min(1, { error: "La contraseña es obligatoria" })
    .min(6, { error: "La contraseña debe tener al menos 6 caracteres" }),
  role: z.number({ error: "Seleccione un rol" }),
};

export const passwordsMatch = (
  data: { password: string; confirmPassword: string },
  ctx: z.RefinementCtx,
) => {
  if (data.password === data.confirmPassword) return;

  ctx.addIssue({
    code: "custom",
    message: "Las contraseñas no coinciden",
    path: ["password"],
  });
  ctx.addIssue({
    code: "custom",
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
};
