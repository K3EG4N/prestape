import { INITIAL_BASE_FILTERS } from "./filters";
import type { DefaultValues } from "react-hook-form";
import type {
  EquipmentAvailability,
  EquipmentCondition,
  IEquipmentFilters,
  IEquipmentStatusDisplay,
} from "@/interfaces/IEquipment";
import type { CreateEquipmentSchema } from "@/schemas/equipment/create.equipment.schema";

export const INITIAL_EQUIPMENT_FILTERS: IEquipmentFilters = {
  ...INITIAL_BASE_FILTERS,
  categoryIds: [],
  availabilities: [],
  conditions: [],
};

export const EQUIPMENT_AVAILABILITY_DISPLAY: Record<
  EquipmentAvailability,
  IEquipmentStatusDisplay
> = {
  AVAILABLE: { label: "Disponible", color: "green" },
  LOANED: { label: "Prestado", color: "blue" },
  IN_MAINTENANCE: { label: "En mantenimiento", color: "gold" },
  RETIRED: { label: "De baja", color: "default" },
};

export const EQUIPMENT_CONDITION_DISPLAY: Record<
  EquipmentCondition,
  IEquipmentStatusDisplay
> = {
  GOOD: { label: "Bueno", color: "green" },
  WORN: { label: "Desgastado", color: "gold" },
  DAMAGED: { label: "Dañado", color: "red" },
};

export const EQUIPMENT_AVAILABILITY_OPTIONS = (
  Object.keys(EQUIPMENT_AVAILABILITY_DISPLAY) as EquipmentAvailability[]
).map((value) => ({
  value,
  label: EQUIPMENT_AVAILABILITY_DISPLAY[value].label,
}));

export const EQUIPMENT_CONDITION_OPTIONS = (
  Object.keys(EQUIPMENT_CONDITION_DISPLAY) as EquipmentCondition[]
).map((value) => ({
  value,
  label: EQUIPMENT_CONDITION_DISPLAY[value].label,
}));

export const MANUAL_AVAILABILITY_OPTIONS = EQUIPMENT_AVAILABILITY_OPTIONS.filter(
  (option) => option.value !== "LOANED",
);

export const CREATE_EQUIPMENT_DEFAULT_VALUES: DefaultValues<CreateEquipmentSchema> =
  {
    name: "",
    serialNumber: "",
    description: "",
    categoryId: undefined,
    condition: "GOOD",
    conditionNotes: "",
  };
