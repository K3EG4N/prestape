import { authStorage } from "@/utils/authStorage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { IUserProfile } from "@/interfaces/IUserProfile";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(() => authStorage.get());
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(!!session.token);

  const signOut = useCallback(() => {
    authStorage.clear();
    setSession({ token: null });
    setProfile(null);
  }, []);

  const signIn = useCallback((token: string) => {
    authStorage.set(token);
    setSession({ token });
  }, []);

  const refreshProfile = useCallback(async () => {
    // setLoadingProfile(true);
    // try {
    //   const response = await UserService.getMe();
    //   setProfile(response.data);
    // } catch {
    //   signOut();
    // } finally {
    //   setLoadingProfile(false);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signOut]);

  // Cada vez que hay token (login o refresh de página), se carga el perfil
  useEffect(() => {
    if (session.token) {
      refreshProfile();
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoadingProfile(false);
    }
  }, [session.token, refreshProfile]);

  const value = useMemo(
    () => ({
      ...session,
      profile,
      isAuthenticated: !!session.token,
      loadingProfile,
      signIn,
      signOut,
      refreshProfile,
    }),
    [session, profile, loadingProfile, signIn, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
