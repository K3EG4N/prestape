import type { ReactNode } from "react";

export interface ISettingsPanelProps {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
  footer?: ReactNode;
}

export interface ISettingsGroupProps {
  title: string;
  children: ReactNode;
}

export interface ISettingsRowProps {
  title: string;
  description: string;
  error?: string;
  children: ReactNode;
}

export interface ISettingsBusinessDay {
  day: number;
  open: boolean;
  opensAt: string;
  closesAt: string;
}

export interface ISettingsRoleLimit {
  roleId: number;
  roleName: string;
  roleLabel: string;
  maxEquipments: number;
  maxActiveLoans: number;
}

export interface ISettings {
  toleranceMinutes: number;
  maxDurationDays: number;
  minAdvanceHours: number;
  autoCancelHours: number;
  roleLimits: ISettingsRoleLimit[];
  businessHours: ISettingsBusinessDay[];
  updatedAt: string;
  updatedBy: string | null;
}

export interface IUpdateSettingsRequest {
  toleranceMinutes: number;
  maxDurationDays: number;
  minAdvanceHours: number;
  autoCancelHours: number;
  roleLimits: Pick<
    ISettingsRoleLimit,
    "roleId" | "maxEquipments" | "maxActiveLoans"
  >[];
  businessHours: ISettingsBusinessDay[];
}
