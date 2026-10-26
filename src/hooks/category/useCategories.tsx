import { useCallback, useEffect, useMemo, useState } from "react";
import { usePagination } from "../usePagination";
import { useApiRequest } from "../useApiRequest";
import { INITIAL_BASE_FILTERS } from "@/constants/filters";
import { EMPTY_PAGE } from "@/constants/pagination";
import { useAbortController } from "../useAbortController";
import { CategoryService } from "@/services/CategoryService";
import type { IPageResponse } from "@/interfaces/IApiResponse";
import type { ICategory } from "@/interfaces/ICatalog";
import type { IBaseFilters, IBaseListRequest } from "@/interfaces/IBaseFilter";

export const useCategories = () => {
  const pagination = usePagination();
  const { execute, loading } = useApiRequest();
  const { renewSignal } = useAbortController();
  const { page, size } = pagination;
  const [filter, setFilter] = useState<IBaseFilters>(INITIAL_BASE_FILTERS);
  const [data, setData] = useState<IPageResponse<ICategory>>(EMPTY_PAGE);

  const request = useMemo<IBaseListRequest>(
    () => ({ page, size, search: filter?.search }),
    [page, size, filter],
  );

  const fetchEquipmentCategories = useCallback(async () => {
    const response = await execute(
      () => CategoryService.list(request, renewSignal()),
      {
        silentSuccess: true,
      },
    );
    if (response) setData(response.value);
  }, [execute, request, renewSignal]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEquipmentCategories();
  }, [fetchEquipmentCategories]);

  const onChangeSearch = (value: string) => {
    setFilter((prev) => ({ ...prev, search: value }));
  };

  return { data, loading, reload: fetchEquipmentCategories, onChangeSearch };
};
