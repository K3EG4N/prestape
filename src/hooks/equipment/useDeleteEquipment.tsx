import { useApiRequest } from "../useApiRequest";
import { EquipmentService } from "@/services/EquipmentService";

export const useDeleteEquipment = () => {
  const { execute, loading } = useApiRequest();

  const deleteEquipment = async (id: number, callback?: () => void) => {
    const response = await execute(() => EquipmentService.remove(id));

    if (response?.success) {
      callback?.();
    }
  };

  return { deleteEquipment, loading };
};
