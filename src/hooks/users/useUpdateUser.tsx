import { useApiRequest } from "../useApiRequest";
import { UserService } from "@/services/UserService";
import type { IUpdateUserRequest } from "@/interfaces/IUser";

export const useUpdateUser = () => {
  const { execute, loading } = useApiRequest();

  const updateUser = async (
    id: number,
    request: IUpdateUserRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => UserService.update(id, request));

    if (response?.success) {
      callback?.();
    }
  };

  return { updateUser, loading };
};
