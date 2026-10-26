import type { ICategory } from "@/interfaces/ICatalog";
import type { EditCategorySchema } from "@/schemas/category/edit.category.schema";

export const toEditCategoryFormValues = (
  category: ICategory,
): EditCategorySchema => ({
  name: category.name,
  description: category.description ?? "",
});
