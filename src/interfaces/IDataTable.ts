import type { ReactNode } from "react";
import type { IPagination } from "./IPagination";

export interface IDataTableColumn<T> {
  key: string;
  title: ReactNode;
  dataIndex?: keyof T;
  render?: (value: T[keyof T] | undefined, row: T, index: number) => ReactNode;
  className?: string;
  width?: string;
  align?: "start" | "center" | "end";
}

export interface IDataTablePagination
  extends Pick<IPagination, "page" | "size" | "changePage"> {
  total: number;
}

export interface IDataTableProps<T> {
  data: T[];
  columns: IDataTableColumn<T>[];
  rowKey?: keyof T | ((row: T) => string | number);
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  filters?: ReactNode;
  loading?: boolean;
  pagination?: IDataTablePagination;
  onSearchChange?: (value: string) => void;
}
