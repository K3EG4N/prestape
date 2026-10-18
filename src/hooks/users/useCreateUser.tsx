import { useApiRequest } from "../useApiRequest";
import { UserService } from "@/services/UserService";
import type { ICreateUserRequest } from "@/interfaces/IUser";

export const useCreateUser = () => {
  const { execute, loading } = useApiRequest();

  const createUser = async (
    request: ICreateUserRequest,
    callback?: () => void,
  ) => {
    const response = await execute(() => UserService.create(request));

    if (response?.success) {
      callback?.();
    }
  };

  return { createUser, loading };
};
