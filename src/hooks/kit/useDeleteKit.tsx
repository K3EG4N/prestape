import { useApiRequest } from "../useApiRequest";
import { KitService } from "@/services/KitService";

export const useDeleteKit = () => {
  const { execute, loading } = useApiRequest();

  const deleteKit = async (id: number, callback?: () => void) => {
    const response = await execute(() => KitService.remove(id));

    if (response?.success) {
      callback?.();
    }
  };

  return { deleteKit, loading };
};
