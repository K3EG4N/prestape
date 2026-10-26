import { useCallback, useEffect, useMemo, useState } from "react";
import { KitService } from "@/services/KitService";
import { useApiRequest } from "../useApiRequest";
import { useAbortController } from "../useAbortController";
import { usePagination } from "../usePagination";
import { INITIAL_KIT_FILTERS } from "@/constants/kit";
import { EMPTY_PAGE } from "@/constants/pagination";
import { buildKitFilterParams } from "@/utils/kit";
import type { IPageResponse } from "@/interfaces/IApiResponse";
import type { IKit, IKitFilters, IKitListRequest } from "@/interfaces/IKit";

export const useKits = () => {
  const pagination = usePagination();
  const { execute, loading } = useApiRequest();
  const { renewSignal } = useAbortController();
  const { page, size, resetPage } = pagination;
  const [filters, setFilters] = useState<IKitFilters>(INITIAL_KIT_FILTERS);
  const [data, setData] = useState<IPageResponse<IKit>>(EMPTY_PAGE);

  const request = useMemo<IKitListRequest>(
    () => ({ page, size, ...buildKitFilterParams(filters) }),
    [page, size, filters],
  );

  const fetchKits = useCallback(async () => {
    const signal = renewSignal();
    const response = await execute(() => KitService.list(request, signal), {
      silentSuccess: true,
    });

    if (response) setData(response.value);
  }, [execute, request, renewSignal]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchKits();
  }, [fetchKits]);

  const changeFilter = <K extends keyof IKitFilters>(
    key: K,
    value: IKitFilters[K],
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
    reload: fetchKits,
  };
};
