import type { ReactNode } from "react";
import type { IconName } from "@/utils/getIcon";
import type { IDataTableColumn } from "./IDataTable";
import type { EquipmentAvailability, EquipmentCondition } from "./IEquipment";
import type { UserStatus } from "./IUser";

export interface IStatCardProps {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  caption?: ReactNode;
  trend?: number;
}

export interface IDashboardCardProps {
  title: string;
  linkTo?: string;
  linkLabel?: string;
  extra?: ReactNode;
  footer?: ReactNode;
  footerExtra?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

export interface IBreakdownSegment {
  key: string;
  label: string;
  value: number;
  color: string;
}

export interface IBreakdownBarProps {
  segments: IBreakdownSegment[];
}

export interface ICompactTableProps<T> {
  data: T[];
  columns: IDataTableColumn<T>[];
  rowKey: (row: T) => string | number;
}

export interface ILoanTrendPoint {
  week: string;
  type: "Préstamos" | "Devoluciones";
  value: number;
}

export interface ITopEquipment {
  id: number;
  code: string;
  serial: string;
  name: string;
  category: string;
  loans: number;
}

export interface IDueReturn {
  id: number;
  code: string;
  serial: string;
  item: string;
  borrower: string;
  dueAt: string;
  returned: boolean;
}

export interface IMemberStats {
  activeLoans: number;
  nextReturnInDays: number;
  nextReturnDate: string;
  pendingRequests: number;
  historyCount: number;
  onTimeRate: number;
}

export interface IMyLoan {
  id: number;
  code: string;
  name: string;
  borrowedAt: string;
  dueAt: string;
}

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IMyRequest {
  id: number;
  item: string;
  requestedAt: string;
  status: RequestStatus;
}

export interface ICategoryAvailability {
  id: number;
  name: string;
  available: number;
  icon: IconName;
}

export interface IAdminEquipmentSummary {
  total: number;
  byAvailability: Record<EquipmentAvailability, number>;
  byCondition: Record<EquipmentCondition, number>;
}

export interface IAdminKitSummary {
  total: number;
  available: number;
}

export interface ICategoryStock {
  id: number;
  name: string;
  total: number;
  available: number;
  equipmentNames: string[];
}

export interface IRecentUser {
  id: number;
  name: string | null;
  email: string;
  role: string | null;
  status: UserStatus;
  profileCompleted: boolean;
  createdAt: string;
}

export interface IAdminUserSummary {
  total: number;
  active: number;
  incomplete: number;
  suspended: number;
  newThisMonth: number;
  recentUsers: IRecentUser[];
}

export interface IAttentionEquipment {
  id: number;
  code: string;
  name: string;
  category: string;
  availability: EquipmentAvailability;
  condition: EquipmentCondition;
  conditionNotes: string | null;
}

export interface IAdminDashboard {
  equipment: IAdminEquipmentSummary;
  kits: IAdminKitSummary;
  categories: ICategoryStock[];
  users: IAdminUserSummary;
  attention: IAttentionEquipment[];
}

export interface IInventoryStatusCardProps {
  equipment: IAdminEquipmentSummary;
  categories: ICategoryStock[];
}

export interface IUsersSummaryCardProps {
  users: IAdminUserSummary;
}
