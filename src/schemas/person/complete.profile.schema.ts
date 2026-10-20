import { z } from "zod";
import { basePersonFields } from "./base.person.schema";

export const completeProfileSchema = z.object(basePersonFields);

export type CompleteProfileSchema = z.infer<typeof completeProfileSchema>;
