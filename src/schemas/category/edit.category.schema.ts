import { z } from "zod";
import { baseCategoryFields } from "./base.category.schema";

export const editCategorySchema = z.object({
  name: baseCategoryFields.name,
  description: baseCategoryFields.description,
});

export type EditCategorySchema = z.infer<typeof editCategorySchema>;
