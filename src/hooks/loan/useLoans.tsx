import { useCallback, useEffect, useMemo, useState } from "react";
import { LoanService } from "@/services/LoanService";
import { useApiRequest } from "../useApiRequest";
import { useAbortController } from "../useAbortController";
import { usePagination } from "../usePagination";
import { INITIAL_LOAN_FILTERS } from "@/constants/loan";
import { EMPTY_PAGE } from "@/constants/pagination";
import { buildLoanFilterParams } from "@/utils/loan";
import type { IPageResponse } from "@/interfaces/IApiResponse";
import type { ILoan, ILoanFilters, ILoanListRequest } from "@/interfaces/ILoan";

export const useLoans = () => {
  const pagination = usePagination();
  const { execute, loading } = useApiRequest();
  const { renewSignal } = useAbortController();
  const { page, size, resetPage } = pagination;
  const [filters, setFilters] = useState<ILoanFilters>(INITIAL_LOAN_FILTERS);
  const [data, setData] = useState<IPageResponse<ILoan>>(EMPTY_PAGE);

  const request = useMemo<ILoanListRequest>(
    () => ({ page, size, ...buildLoanFilterParams(filters) }),
    [page, size, filters],
  );

  const fetchLoans = useCallback(async () => {
    const signal = renewSignal();
    const response = await execute(() => LoanService.list(request, signal), {
      silentSuccess: true,
    });

    if (response) setData(response.value);
  }, [execute, request, renewSignal]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLoans();
  }, [fetchLoans]);

  const changeFilter = <K extends keyof ILoanFilters>(
    key: K,
    value: ILoanFilters[K],
  ) => {
    if (filters[key] === value) return;
    setFilters((current) => ({ ...current, [key]: value }));
    resetPage();
  };

  return {
    data,
    pagination,
    filters,
    loading,
    changeFilter,
    reload: fetchLoans,
  };
};
