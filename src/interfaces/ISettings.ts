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
  open: boolean;
  opensAt: string;
  closesAt: string;
}
