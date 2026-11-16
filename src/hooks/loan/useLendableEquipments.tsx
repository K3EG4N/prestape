import { useCallback, useEffect, useRef, useState } from "react";
import { LoanService } from "@/services/LoanService";
import { useApiRequest } from "../useApiRequest";
import { useAbortController } from "../useAbortController";
import { LOAN_OPTIONS_SEARCH_DELAY } from "@/constants/loan";
import type { ILendableEquipmentOption } from "@/interfaces/ILoan";

export const useLendableEquipments = (open: boolean) => {
  const { execute, loading } = useApiRequest();
  const { renewSignal } = useAbortController();
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [equipments, setEquipments] = useState<ILendableEquipmentOption[]>([]);
  const [known, setKnown] = useState<Record<number, ILendableEquipmentOption>>(
    {},
  );

  const fetchEquipments = useCallback(
    async (search?: string) => {
      const signal = renewSignal();
      const response = await execute(
        () => LoanService.equipmentOptions(search, signal),
        { silentSuccess: true },
      );

      if (!response) return;
      setEquipments(response.value);
      setKnown((current) => ({
        ...current,
        ...Object.fromEntries(
          response.value.map((equipment) => [equipment.id, equipment]),
        ),
      }));
    },
    [execute, renewSignal],
  );

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEquipments();
  }, [open, fetchEquipments]);

  useEffect(() => () => clearTimeout(searchTimer.current), []);

  const search = (value: string) => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(
      () => fetchEquipments(value.trim() || undefined),
      LOAN_OPTIONS_SEARCH_DELAY,
    );
  };

  const findByIds = (ids: number[]) =>
    ids
      .map((id) => known[id])
      .filter((equipment): equipment is ILendableEquipmentOption =>
        Boolean(equipment),
      );

  return { equipments, loading, search, findByIds };
};
