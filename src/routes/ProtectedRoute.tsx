import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/useAuthContext";
import { ProfileGate } from "@/components/auth/ProfileGate";
import { CompleteProfileModal } from "@/components/auth/CompleteProfileModal";
import { HOME_PATH, LOGIN_PATH } from "@/constants/routes";
import type { IProfileGateProps } from "@/interfaces/IRoute";

export const ProtectedRoute = ({ children }: IProfileGateProps) => {
  const { isAuthenticated, profile } = useAuthContext();
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  const profileIncomplete = !!profile && !profile.profileCompleted;

  return (
    <ProfileGate>
      {profileIncomplete && pathname !== HOME_PATH ? (
        <Navigate to={HOME_PATH} replace />
      ) : (
        children
      )}
      <CompleteProfileModal open={profileIncomplete} />
    </ProfileGate>
  );
};
