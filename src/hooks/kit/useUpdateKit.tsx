import { useApiRequest } from "../useApiRequest";
import { KitService } from "@/services/KitService";
import type { IUpdateKitRequest } from "@/interfaces/IKit";

export const useUpdateKit = () => {
  const { execute, loading } = useApiRequest();

  const updateKit = async (
    id: number,
    request: IUpdateKitRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => KitService.update(id, request));

    if (response?.success) {
      callback?.();
    }
  };

  return { updateKit, loading };
};
