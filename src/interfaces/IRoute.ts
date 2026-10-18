import type { Params } from "react-router-dom";

export interface IRouteHandle {
  breadcrumb?: string | ((params: Params) => string);
}
