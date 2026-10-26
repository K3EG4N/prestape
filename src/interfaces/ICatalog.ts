import type { IconName } from "@/utils/getIcon";
import type { IDisclosure } from "./IDisclosure";

export type CatalogTab = "equipment" | "kits" | "categories";

export interface ICatalogTabOption {
  label: string;
  value: CatalogTab;
  icon: IconName;
}

export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  equipmentCount: number;
}

export interface ICategoryOption {
  id: number;
  name: string;
  description: string | null;
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
