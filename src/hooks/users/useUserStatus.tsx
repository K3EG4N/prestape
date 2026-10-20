import { useApiRequest } from "../useApiRequest";
import { UserService } from "@/services/UserService";

export const useUserStatus = () => {
  const { execute, loading } = useApiRequest();

  const run = async (
    request: () => ReturnType<typeof UserService.suspend>,
    callback?: () => void,
  ) => {
    const response = await execute(request);

    if (response?.success) {
      callback?.();
    }
  };

  const suspendUser = (id: number, callback?: () => void) =>
    run(() => UserService.suspend(id), callback);

  const reactivateUser = (id: number, callback?: () => void) =>
    run(() => UserService.reactivate(id), callback);

  return { suspendUser, reactivateUser, loading };
};
