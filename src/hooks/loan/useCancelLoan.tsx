import { useApiRequest } from "../useApiRequest";
import { LoanService } from "@/services/LoanService";

export const useCancelLoan = () => {
  const { execute, loading } = useApiRequest();

  const cancelLoan = async (id: number, callback?: () => void) => {
    const response = await execute(() => LoanService.cancel(id));

    if (response?.success) {
      callback?.();
    }
  };

  return { cancelLoan, loading };
};
