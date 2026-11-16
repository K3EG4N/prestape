import { useApiRequest } from "../useApiRequest";
import { SettingsService } from "@/services/SettingsService";
import type { IUpdateSettingsRequest } from "@/interfaces/ISettings";

export const useUpdateSettings = () => {
  const { execute, loading } = useApiRequest();

  const updateSettings = async (
    request: IUpdateSettingsRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => SettingsService.update(request));

    if (response?.success) {
      callback?.();
    }
  };

  return { updateSettings, loading };
};
