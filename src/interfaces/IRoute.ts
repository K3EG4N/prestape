import type { ReactNode } from "react";
import type { Params } from "react-router-dom";

export interface IRouteHandle {
  breadcrumb?: string | ((params: Params) => string);
  roles?: string[];
}

export interface IProfileGateProps {
  children: ReactNode;
}
