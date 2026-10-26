import { z } from "zod";
import { baseCategoryFields } from "./base.category.schema";

export const createCategorySchema = z.object({
  name: baseCategoryFields.name,
  description: baseCategoryFields.description,
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
