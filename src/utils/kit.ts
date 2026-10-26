import type { IKit, IKitFilters } from "@/interfaces/IKit";
import type { EditKitSchema } from "@/schemas/kit/edit.kit.schema";

export const buildKitFilterParams = (filters: IKitFilters) => ({
  search: filters.search || undefined,
  availabilities: filters.availabilities,
});

export const toEditKitFormValues = (kit: IKit): EditKitSchema => ({
  name: kit.name,
  description: kit.description ?? "",
  equipmentIds: kit.items.map((item) => item.id),
});
