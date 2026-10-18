import { useEffect, useState } from "react";
import { RoleService } from "@/services/RoleService";
import { useApiRequest } from "../useApiRequest";
import type { IRole } from "@/interfaces/IRole";

export const useRoles = () => {
  const { execute, loading } = useApiRequest();
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    execute(() => RoleService.list(), { silentSuccess: true }).then(
      (response) => setRoles(response?.value ?? []),
    );
  }, [execute]);

  return { roles, loading };
};
