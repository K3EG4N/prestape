import { z } from "zod";
import { baseUserFields, passwordsMatch } from "./base.user.schema";
import { createPersonSchema } from "../person/create.person.schema";

export const createUserSchema = z
  .object({
    ...baseUserFields,
    person: createPersonSchema,
  })
  .superRefine(passwordsMatch);

export type CreateUserSchema = z.infer<typeof createUserSchema>;
