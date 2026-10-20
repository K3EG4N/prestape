import { useMatches, type UIMatch } from "react-router-dom";
import { useAuthContext } from "@/context/useAuthContext";
import { ForbiddenResult } from "./ForbiddenResult";
import { hasAnyRole } from "@/utils/auth";
import type { IProfileGateProps, IRouteHandle } from "@/interfaces/IRoute";

export const RouteRoleGuard = ({ children }: IProfileGateProps) => {
  const { profile } = useAuthContext();
  const matches = useMatches() as UIMatch<unknown, IRouteHandle | undefined>[];

  const allowed = matches.every(
    (match) => !match.handle?.roles || hasAnyRole(profile, match.handle.roles),
  );

  return allowed ? children : <ForbiddenResult />;
};
