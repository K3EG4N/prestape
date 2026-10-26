import { INITIAL_BASE_FILTERS } from "./filters";
import type { DefaultValues } from "react-hook-form";
import type {
  IKitAvailabilityDisplay,
  IKitFilters,
  KitAvailability,
} from "@/interfaces/IKit";
import type { CreateKitSchema } from "@/schemas/kit/create.kit.schema";

export const KIT_VISIBLE_ITEMS = 2;

export const INITIAL_KIT_FILTERS: IKitFilters = {
  ...INITIAL_BASE_FILTERS,
  availabilities: [],
};

export const KIT_AVAILABILITY_DISPLAY: Record<
  KitAvailability,
  IKitAvailabilityDisplay
> = {
  AVAILABLE: { label: "Disponible", color: "green" },
  UNAVAILABLE: { label: "No disponible", color: "red" },
  EMPTY: { label: "Sin equipos", color: "default" },
};

export const KIT_AVAILABILITY_OPTIONS = (
  Object.keys(KIT_AVAILABILITY_DISPLAY) as KitAvailability[]
).map((value) => ({
  value,
  label: KIT_AVAILABILITY_DISPLAY[value].label,
}));

export const CREATE_KIT_DEFAULT_VALUES: DefaultValues<CreateKitSchema> = {
  name: "",
  description: "",
  equipmentIds: [],
};
