import { useCallback, useEffect, useState } from "react";
import { DashboardService } from "@/services/DashboardService";
import { useApiRequest } from "../useApiRequest";
import type { IAdminDashboard } from "@/interfaces/IDashboard";

export const useAdminDashboard = () => {
  const { execute, loading } = useApiRequest();
  const [data, setData] = useState<IAdminDashboard | null>(null);

  const fetchDashboard = useCallback(async () => {
    const response = await execute(() => DashboardService.admin(), {
      silentSuccess: true,
    });

    if (response) setData(response.value);
  }, [execute]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, reload: fetchDashboard };
};
