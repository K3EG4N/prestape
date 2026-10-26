import type { IBaseFilters, IBaseListRequest } from "./IBaseFilter";
import type { IDisclosure } from "./IDisclosure";

export type EquipmentAvailability =
  | "AVAILABLE"
  | "LOANED"
  | "IN_MAINTENANCE"
  | "RETIRED";

export type EquipmentCondition = "GOOD" | "WORN" | "DAMAGED";

export interface IEquipmentCategoryInfo {
  id: number;
  name: string;
}

export interface IEquipment {
  id: number;
  code: string;
  serialNumber: string;
  name: string;
  description: string | null;
  availability: EquipmentAvailability;
  condition: EquipmentCondition;
  conditionNotes: string | null;
  category: IEquipmentCategoryInfo;
  createdAt: string;
}

export interface IEquipmentFilters extends IBaseFilters {
  categoryIds: string[];
  availabilities: string[];
  conditions: string[];
}

export interface IEquipmentListRequest extends IBaseListRequest {
  categoryIds?: string[];
  availabilities?: string[];
  conditions?: string[];
}

export interface ICreateEquipmentRequest {
  name: string;
  serialNumber: string;
  description?: string;
  categoryId: number;
  condition: EquipmentCondition;
  conditionNotes?: string;
}

export interface IUpdateEquipmentRequest extends ICreateEquipmentRequest {
  availability: EquipmentAvailability;
}

export interface IEquipmentRowHandlers {
  onEdit: (equipment: IEquipment) => void;
  onDelete: (equipment: IEquipment) => void;
}

export interface IEditEquipmentModalProps extends IDisclosure {
  equipment: IEquipment | null;
}

export interface IDeleteEquipmentModalProps extends IDisclosure {
  equipment: IEquipment | null;
}

export interface IEquipmentStatusDisplay {
  label: string;
  color: string;
}
