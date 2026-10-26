import type { CreateCategorySchema } from "@/schemas/category/create.category.schema";
import type { DefaultValues } from "react-hook-form";

export const CREATE_CATEGORY_DEFAULT_VALUES: DefaultValues<CreateCategorySchema> = {
  name: "",
  description: "",
};
