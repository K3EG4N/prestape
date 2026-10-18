import type { ReactNode } from "react";

export interface IFieldProps {
  children: ReactNode;
  label: string;
  rightlabel?: ReactNode;
  required?: boolean;
}
