import { useApiRequest } from "../useApiRequest";
import { LoanService } from "@/services/LoanService";
import type { IRegisterReturnRequest } from "@/interfaces/ILoan";

export const useRegisterReturn = () => {
  const { execute, loading } = useApiRequest();

  const registerReturn = async (
    id: number,
    request: IRegisterReturnRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() =>
      LoanService.registerReturn(id, request),
    );

    if (response?.success) {
      callback?.();
    }
  };

  return { registerReturn, loading };
};
