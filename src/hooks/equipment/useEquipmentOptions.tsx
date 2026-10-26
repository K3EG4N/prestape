import { useEffect, useState } from "react";
import { EquipmentService } from "@/services/EquipmentService";
import { useApiRequest } from "../useApiRequest";
import type { IEquipmentOption } from "@/interfaces/IEquipment";

export const useEquipmentOptions = (open: boolean, kitId?: number) => {
  const { execute, loading } = useApiRequest();
  const [equipments, setEquipments] = useState<IEquipmentOption[]>([]);

  useEffect(() => {
    if (!open) return;

    execute(() => EquipmentService.options(kitId), {
      silentSuccess: true,
    }).then((response) => setEquipments(response?.value ?? []));
  }, [execute, open, kitId]);

  return { equipments, loading };
};
