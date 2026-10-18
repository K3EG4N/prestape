import { z } from "zod";
import { baseUserFields } from "./base.user.schema";
import { editPersonSchema } from "../person/edit.person.schema";

export const editUserSchema = z.object({
  email: baseUserFields.email,
  person: editPersonSchema,
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
