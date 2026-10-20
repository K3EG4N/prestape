import { AuthService } from "@/services/AuthService";
import { useApiRequest } from "../useApiRequest";
import { useAuthContext } from "@/context/useAuthContext";
import type { IRegisterRequest } from "@/interfaces/IAuth";

export const useRegister = () => {
  const { signIn } = useAuthContext();
  const { execute, loading, parseError } = useApiRequest();

  const register = async (request: IRegisterRequest) => {
    try {
      const response = await execute(() => AuthService.register(request), {
        silent: true,
        throwOnError: true,
      });

      if (response?.success) {
        signIn(response.value.token);
      }

      return { data: response, error: null, status: null };
    } catch (err) {
      const { message, status } = parseError(err);
      return { data: null, error: message, status };
    }
  };

  return { register, loading };
};
