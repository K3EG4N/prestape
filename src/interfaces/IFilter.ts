import type { Dayjs } from "dayjs";
import type { ReactNode } from "react";

export type DateRange = [Dayjs, Dayjs];

export interface IFilterOption {
  value: string;
  label: ReactNode;
}

interface IFilterDropdownItemBase {
  key: string;
  label: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
}

export interface IOptionsFilterItem extends IFilterDropdownItemBase {
  type: "options";
  options: IFilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
}

export interface IDateRangeFilterItem extends IFilterDropdownItemBase {
  type: "dateRange";
  value: DateRange | null;
  onChange: (value: DateRange | null) => void;
}

export type FilterDropdownItem = IOptionsFilterItem | IDateRangeFilterItem;

export interface IFilterDropdownProps {
  items: FilterDropdownItem[];
  label?: string;
}
