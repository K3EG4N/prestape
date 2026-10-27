import { useCallback, useEffect, useState } from "react";
import { DashboardService } from "@/services/DashboardService";
import { useApiRequest } from "../useApiRequest";
import type { IAdminDashboard } from "@/interfaces/IDashboard";

export const useAdminDashboard = (enabled: boolean) => {
  const { execute, loading } = useApiRequest();
  const [data, setData] = useState<IAdminDashboard | null>(null);
  const [failed, setFailed] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const fetchDashboard = useCallback(async () => {
    setFailed(false);
    const response = await execute(() => DashboardService.admin(), {
      silentSuccess: true,
    });

    if (response) {
      setData(response.value);
      setUpdatedAt(new Date());
    } else {
      setFailed(true);
    }
  }, [execute]);

  useEffect(() => {
    if (!enabled) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard();
  }, [enabled, fetchDashboard]);

  return { data, loading, failed, updatedAt, reload: fetchDashboard };
};
