import { useCallback, useEffect, useState } from "react";
import { SettingsService } from "@/services/SettingsService";
import { useApiRequest } from "../useApiRequest";
import { useAbortController } from "../useAbortController";
import type { ISettings } from "@/interfaces/ISettings";

export const useSettings = () => {
  const { execute, loading } = useApiRequest();
  const { renewSignal } = useAbortController();
  const [settings, setSettings] = useState<ISettings | null>(null);

  const fetchSettings = useCallback(async () => {
    const signal = renewSignal();
    const response = await execute(() => SettingsService.get(signal), {
      silentSuccess: true,
    });

    if (response) setSettings(response.value);
  }, [execute, renewSignal]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSettings();
  }, [fetchSettings]);

  return { settings, loading, reload: fetchSettings };
};
