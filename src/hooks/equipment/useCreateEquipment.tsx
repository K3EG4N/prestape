import { useApiRequest } from "../useApiRequest";
import { EquipmentService } from "@/services/EquipmentService";
import type { ICreateEquipmentRequest } from "@/interfaces/IEquipment";

export const useCreateEquipment = () => {
  const { execute, loading } = useApiRequest();

  const createEquipment = async (
    request: ICreateEquipmentRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => EquipmentService.create(request));

    if (response?.success) {
      callback?.();
    }
  };

  return { createEquipment, loading };
};
