import { useEffect, useState } from "react";
import { CategoryService } from "@/services/CategoryService";
import { useApiRequest } from "../useApiRequest";
import type { ICategoryOption } from "@/interfaces/ICatalog";

export const useCategoryOptions = () => {
  const { execute, loading } = useApiRequest();
  const [categories, setCategories] = useState<ICategoryOption[]>([]);

  useEffect(() => {
    execute(() => CategoryService.options(), { silentSuccess: true }).then(
      (response) => setCategories(response?.value ?? []),
    );
  }, [execute]);

  return { categories, loading };
};
