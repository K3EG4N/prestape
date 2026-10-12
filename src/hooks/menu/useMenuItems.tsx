import { MenuService } from "@/services/MenuService";
import { useApiRequest } from "../useApiRequest";
import { useEffect, useState } from "react";
import type { IMenuItem } from "@/interfaces/IMenu";

export const useMenuItems = () => {
  const { execute, loading } = useApiRequest();
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  const getMenuItems = async () => {
    const response = await execute(() => MenuService.getMenuItems(), {
      silentSuccess: true,
    });

    setMenuItems(response?.value ?? []);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { menuItems, loading };
};
