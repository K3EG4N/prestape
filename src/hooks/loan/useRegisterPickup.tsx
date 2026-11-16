import { useApiRequest } from "../useApiRequest";
import { LoanService } from "@/services/LoanService";
import type { IRegisterPickupRequest } from "@/interfaces/ILoan";

export const useRegisterPickup = () => {
  const { execute, loading } = useApiRequest();

  const registerPickup = async (
    id: number,
    request: IRegisterPickupRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() =>
      LoanService.registerPickup(id, request),
    );

    if (response?.success) {
      callback?.();
    }
  };

  return { registerPickup, loading };
};
