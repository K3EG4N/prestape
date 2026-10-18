import { z } from "zod";
import { basePersonFields } from "./base.person.schema";

export const createPersonSchema = z.object(basePersonFields);

export type CreatePersonSchema = z.infer<typeof createPersonSchema>;
