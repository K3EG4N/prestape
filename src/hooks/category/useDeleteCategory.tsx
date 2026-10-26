import { useApiRequest } from "../useApiRequest";
import { CategoryService } from "@/services/CategoryService";

export const useDeleteCategory = () => {
  const { execute, loading } = useApiRequest();

  const deleteCategory = async (id: number, callback?: () => void) => {
    const response = await execute(() => CategoryService.remove(id));

    if (response?.success) {
      callback?.();
    }
  };

  return { deleteCategory, loading };
};
