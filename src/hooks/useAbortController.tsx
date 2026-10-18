import { useCallback, useEffect, useRef } from "react";

export const useAbortController = () => {
  const controllerRef = useRef<AbortController | null>(null);

  const abort = useCallback(() => controllerRef.current?.abort(), []);

  const renewSignal = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    return controllerRef.current.signal;
  }, []);

  useEffect(() => abort, [abort]);

  return { renewSignal, abort };
};
