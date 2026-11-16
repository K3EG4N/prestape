import { useApiRequest } from "../useApiRequest";
import { LoanService } from "@/services/LoanService";
import type { ICreateLoanRequest } from "@/interfaces/ILoan";

export const useCreateLoan = () => {
  const { execute, loading } = useApiRequest();

  const createLoan = async (
    request: ICreateLoanRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => LoanService.create(request));

    if (response?.success) {
      callback?.();
    }
  };

  return { createLoan, loading };
};
