import { useApiRequest } from "../useApiRequest";
import { useAuthContext } from "@/context/useAuthContext";
import { MeService } from "@/services/MeService";
import type { ICreatePersonRequest } from "@/interfaces/IPerson";

export const useCompleteProfile = () => {
  const { refreshProfile } = useAuthContext();
  const { execute, loading } = useApiRequest();

  const completeProfile = async (request: ICreatePersonRequest) => {
    const response = await execute(() => MeService.completeProfile(request));

    if (response?.success) {
      await refreshProfile({ silent: true });
    }
  };

  return { completeProfile, loading };
};
