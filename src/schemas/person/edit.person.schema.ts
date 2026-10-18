import { z } from "zod";
import { basePersonFields } from "./base.person.schema";

export const editPersonSchema = z.object(basePersonFields);

export type EditPersonSchema = z.infer<typeof editPersonSchema>;
