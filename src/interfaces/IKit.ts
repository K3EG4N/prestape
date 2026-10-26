import type { IBaseFilters, IBaseListRequest } from "./IBaseFilter";
import type { IDisclosure } from "./IDisclosure";
import type {
  EquipmentAvailability,
  EquipmentCondition,
} from "./IEquipment";

export type KitAvailability = "AVAILABLE" | "UNAVAILABLE" | "EMPTY";

export interface IKitItem {
  id: number;
  code: string;
  name: string;
  availability: EquipmentAvailability;
  condition: EquipmentCondition;
}

export interface IKit {
  id: number;
  code: string;
  name: string;
  description: string | null;
  availability: KitAvailability;
  items: IKitItem[];
  createdAt: string;
}

export interface IKitFilters extends IBaseFilters {
  availabilities: string[];
}

export interface IKitListRequest extends IBaseListRequest {
  availabilities?: string[];
}

export interface ICreateKitRequest {
  name: string;
  description?: string;
  equipmentIds: number[];
}

export type IUpdateKitRequest = ICreateKitRequest;

export interface IKitRowHandlers {
  onEdit: (kit: IKit) => void;
  onDelete: (kit: IKit) => void;
}

export interface IEditKitModalProps extends IDisclosure {
  kit: IKit | null;
}

export interface IDeleteKitModalProps extends IDisclosure {
  kit: IKit | null;
}

export interface IKitAvailabilityDisplay {
  label: string;
  color: string;
}
