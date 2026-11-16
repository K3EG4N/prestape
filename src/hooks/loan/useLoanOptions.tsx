import { useEffect, useState } from "react";
import { LoanService } from "@/services/LoanService";
import { useApiRequest } from "../useApiRequest";
import { EMPTY_LOAN_OPTIONS } from "@/constants/loan";
import type { ILoanOptions } from "@/interfaces/ILoan";

export const useLoanOptions = (open: boolean, includeRequesters: boolean) => {
  const { execute, loading } = useApiRequest();
  const [options, setOptions] = useState<ILoanOptions>(EMPTY_LOAN_OPTIONS);

  useEffect(() => {
    if (!open) return;

    const options = { silentSuccess: true };
    Promise.all([
      includeRequesters
        ? execute(() => LoanService.requesterOptions(), options)
        : null,
      execute(() => LoanService.kitOptions(), options),
    ]).then(([requesters, kits]) =>
      setOptions({
        requesters: requesters?.value ?? [],
        kits: kits?.value ?? [],
      }),
    );
  }, [execute, open, includeRequesters]);

  return { options, loading };
};
