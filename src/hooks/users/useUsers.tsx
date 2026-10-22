import { useCallback, useEffect, useMemo, useState } from "react";
import { UserService } from "@/services/UserService";
import { useApiRequest } from "../useApiRequest";
import { useAbortController } from "../useAbortController";
import { usePagination } from "../usePagination";
import { INITIAL_USER_FILTERS } from "@/constants/users";
import { EMPTY_PAGE } from "@/constants/pagination";
import { buildUserFilterParams } from "@/utils/user";
import type { IPageResponse } from "@/interfaces/IApiResponse";
import type { IUser, IUserFilters, IUserListRequest } from "@/interfaces/IUser";

export const useUsers = () => {
  const { execute, loading } = useApiRequest();
  const { renewSignal } = useAbortController();
  const pagination = usePagination();
  const { page, size, resetPage } = pagination;
  const [filters, setFilters] = useState<IUserFilters>(INITIAL_USER_FILTERS);
  const [data, setData] = useState<IPageResponse<IUser>>(EMPTY_PAGE);

  const request = useMemo<IUserListRequest>(
    () => ({ page, size, ...buildUserFilterParams(filters) }),
    [page, size, filters],
  );

  const fetchUsers = useCallback(async () => {
    const signal = renewSignal();
    const response = await execute(() => UserService.list(request, signal), {
      silentSuccess: true,
    });

    if (response) setData(response.value);
  }, [execute, request, renewSignal]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [fetchUsers]);

  const changeFilter = <K extends keyof IUserFilters>(
    key: K,
    value: IUserFilters[K],
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
    reload: fetchUsers,
  };
};
