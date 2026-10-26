import type { IEquipment, IEquipmentFilters } from "@/interfaces/IEquipment";
import type { EditEquipmentSchema } from "@/schemas/equipment/edit.equipment.schema";

export const buildEquipmentFilterParams = (filters: IEquipmentFilters) => ({
  search: filters.search || undefined,
  categoryIds: filters.categoryIds,
  availabilities: filters.availabilities,
  conditions: filters.conditions,
});

export const toEditEquipmentFormValues = (
  equipment: IEquipment,
): EditEquipmentSchema => ({
  name: equipment.name,
  serialNumber: equipment.serialNumber,
  description: equipment.description ?? "",
  categoryId: equipment.category.id,
  availability: equipment.availability,
  condition: equipment.condition,
  conditionNotes: equipment.conditionNotes ?? "",
});
