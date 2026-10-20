import { TOKEN_KEY } from "@/constants/storage";
import { HOME_PATH } from "@/constants/routes";
import axios, { AxiosError } from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isLogin = error.config?.url?.includes("/auth/login");

    if (error.response?.status === 401 && !isLogin) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }

    const code = (error.response?.data as { code?: string } | undefined)?.code;
    const onHome = window.location.pathname === HOME_PATH;

    if (
      error.response?.status === 403 &&
      code === "PROFILE_INCOMPLETE" &&
      !onHome
    ) {
      window.location.href = HOME_PATH;
    }

    return Promise.reject(error);
  },
);
