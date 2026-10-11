import { useState, useRef, useCallback } from "react";
import { App } from "antd";
import type { IApiResponse } from "@/interfaces/IApiResponse";
import axios from "axios";

export interface ExecuteOptions {
  silentSuccess?: boolean;
  successMessage?: string;
  silent?: boolean;
  errorFallback?: string;
  throwOnError?: boolean;
}

export interface ParsedError {
  message: string;
  isCancel: boolean;
  status: number | null;
}

const parseError = (
  err: unknown,
  fallbackMessage = "Ocurrió un error inesperado en la solicitud",
): ParsedError => {
  if (
    axios.isCancel(err) ||
    (err instanceof DOMException && err.name === "AbortError")
  ) {
    return {
      message: "Petición cancelada",
      isCancel: true,
      status: null,
    };
  }

  if (axios.isAxiosError(err)) {
    const status = err.response?.status ?? null;

    const backendMessage = err.response?.data?.message;
    if (backendMessage && typeof backendMessage === "string") {
      return { message: backendMessage, isCancel: false, status };
    }

    if (err.code === "ECONNABORTED") {
      return {
        message: "La solicitud superó el tiempo de espera",
        isCancel: false,
        status,
      };
    }
    if (err.message === "Network Error") {
      return {
        message: "Error de conexión con el servidor",
        isCancel: false,
        status,
      };
    }
  }

  if (err instanceof Error && err.message) {
    return { message: err.message, isCancel: false, status: null };
  }

  if (typeof err === "string") {
    return { message: err, isCancel: false, status: null };
  }

  return {
    message: fallbackMessage,
    isCancel: false,
    status: null,
  };
};

export const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const pendingRef = useRef(0);

  const { message } = App.useApp();

  const execute = useCallback(
    async <T,>(
      fn: () => Promise<IApiResponse<T>>,
      options?: ExecuteOptions,
    ): Promise<IApiResponse<T> | null> => {
      pendingRef.current++;
      setLoading(true);

      try {
        const result = await fn();

        if (!options?.silentSuccess) {
          const successText = result.message || options?.successMessage;
          if (successText) {
            message.success(successText);
          }
        }

        return result;
      } catch (err) {
        const { message: errorMessage, isCancel } = parseError(
          err,
          options?.errorFallback,
        );

        if (!isCancel && !options?.silent) {
          message.error(errorMessage);
        }

        if (options?.throwOnError) {
          throw err;
        }

        return null;
      } finally {
        pendingRef.current--;
        if (pendingRef.current === 0) {
          setLoading(false);
        }
      }
    },
    [message],
  );

  return {
    execute,
    parseError,
    loading,
  };
};
