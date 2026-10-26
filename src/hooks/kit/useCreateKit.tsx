import { useApiRequest } from "../useApiRequest";
import { KitService } from "@/services/KitService";
import type { ICreateKitRequest } from "@/interfaces/IKit";

export const useCreateKit = () => {
  const { execute, loading } = useApiRequest();

  const createKit = async (
    request: ICreateKitRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => KitService.create(request));

    if (response?.success) {
      callback?.();
    }
  };

  return { createKit, loading };
};
