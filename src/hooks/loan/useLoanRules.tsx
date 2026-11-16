import { useEffect, useState } from "react";
import { LoanService } from "@/services/LoanService";
import { useApiRequest } from "../useApiRequest";
import type { ILoanRules } from "@/interfaces/ILoan";

export const useLoanRules = (open: boolean) => {
  const { execute, loading } = useApiRequest();
  const [rules, setRules] = useState<ILoanRules | null>(null);

  useEffect(() => {
    if (!open) return;

    execute(() => LoanService.rules(), { silentSuccess: true }).then(
      (response) => {
        if (response) setRules(response.value);
      },
    );
  }, [execute, open]);

  return { rules, loading };
};
