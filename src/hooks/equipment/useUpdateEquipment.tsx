import { useApiRequest } from "../useApiRequest";
import { EquipmentService } from "@/services/EquipmentService";
import type { IUpdateEquipmentRequest } from "@/interfaces/IEquipment";

export const useUpdateEquipment = () => {
  const { execute, loading } = useApiRequest();

  const updateEquipment = async (
    id: number,
    request: IUpdateEquipmentRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => EquipmentService.update(id, request));

    if (response?.success) {
      callback?.();
    }
  };

  return { updateEquipment, loading };
};
