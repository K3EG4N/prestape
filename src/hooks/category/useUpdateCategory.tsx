import { useApiRequest } from "../useApiRequest";
import { CategoryService } from "@/services/CategoryService";
import type { IUpdateCategoryRequest } from "@/interfaces/ICatalog";

export const useUpdateCategory = () => {
  const { execute, loading } = useApiRequest();

  const updateCategory = async (
    id: number,
    request: IUpdateCategoryRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => CategoryService.update(id, request));

    if (response?.success) {
      callback?.();
    }
  };

  return { updateCategory, loading };
};
