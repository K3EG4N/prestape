import { useCallback, useEffect, useMemo, useState } from "react";
import { EquipmentService } from "@/services/EquipmentService";
import { useApiRequest } from "../useApiRequest";
import { useAbortController } from "../useAbortController";
import { usePagination } from "../usePagination";
import { INITIAL_EQUIPMENT_FILTERS } from "@/constants/equipment";
import { EMPTY_PAGE } from "@/constants/pagination";
import { buildEquipmentFilterParams } from "@/utils/equipment";
import type { IPageResponse } from "@/interfaces/IApiResponse";
import type {
  IEquipment,
  IEquipmentFilters,
  IEquipmentListRequest,
} from "@/interfaces/IEquipment";

export const useEquipments = () => {
  const pagination = usePagination();
  const { execute, loading } = useApiRequest();
  const { renewSignal } = useAbortController();
  const { page, size, resetPage } = pagination;
  const [filters, setFilters] = useState<IEquipmentFilters>(
    INITIAL_EQUIPMENT_FILTERS,
  );
  const [data, setData] = useState<IPageResponse<IEquipment>>(EMPTY_PAGE);

  const request = useMemo<IEquipmentListRequest>(
    () => ({ page, size, ...buildEquipmentFilterParams(filters) }),
    [page, size, filters],
  );

  const fetchEquipments = useCallback(async () => {
    const signal = renewSignal();
    const response = await execute(
      () => EquipmentService.list(request, signal),
      { silentSuccess: true },
    );

    if (response) setData(response.value);
  }, [execute, request, renewSignal]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEquipments();
  }, [fetchEquipments]);

  const changeFilter = <K extends keyof IEquipmentFilters>(
    key: K,
    value: IEquipmentFilters[K],
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
    reload: fetchEquipments,
  };
};
