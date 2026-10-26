import type { IconName } from "@/utils/getIcon";
import type { IDisclosure } from "./IDisclosure";

export type CatalogTab = "equipment" | "kits" | "categories";

export interface ICatalogTabOption {
  label: string;
  value: CatalogTab;
  icon: IconName;
  createLabel: string;
}

export interface ICatalogItem {
  id: number;
  code: string;
  serial: string;
  name: string;
  description: string;
  available: boolean;
}

export interface IEquipment extends ICatalogItem {
  category: string;
}

export interface IKit extends ICatalogItem {
  items: string[];
}

export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  equipmentCount: number;
}

export interface IUpdateCategoryRequest {
  name: string;
  description?: string;
}

export interface ICategoryRowHandlers {
  onEdit: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
}

export interface IEditCategoryModalProps extends IDisclosure {
  category: ICategory | null;
}

export interface IDeleteCategoryModalProps extends IDisclosure {
  category: ICategory | null;
}

export interface ICatalogPageProps {
  tab: CatalogTab;
}
