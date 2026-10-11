import { AuthService } from "@/services/AuthService";
import { useApiRequest } from "../useApiRequest";
import { useAuthContext } from "@/context/useAuthContext";
import type { ILoginRequest } from "@/interfaces/IAuth";

export const useLogin = () => {
  const { signIn } = useAuthContext();
  const { execute, loading, parseError } = useApiRequest();

  const login = async (request: ILoginRequest) => {
    try {
      const response = await execute(() => AuthService.login(request), {
        silent: true,
        throwOnError: true,
      });

      if (response?.success) {
        signIn(response.value.token);
      }

      return { data: response, error: null };
    } catch (err) {
      const { message } = parseError(err);

      return { data: null, error: message };
    }
  };

  return { login, loading };
};
