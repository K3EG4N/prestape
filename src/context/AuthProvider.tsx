import axios from "axios";
import { authStorage } from "@/utils/authStorage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { MeService } from "@/services/MeService";
import type { IUserProfile } from "@/interfaces/IUserProfile";
import type { IRefreshProfileOptions } from "@/interfaces/IAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(() => authStorage.get());
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(!!session.token);
  const [profileError, setProfileError] = useState(false);

  const signOut = useCallback(() => {
    authStorage.clear();
    setSession({ token: null });
    setProfile(null);
  }, []);

  const signIn = useCallback((token: string) => {
    authStorage.set(token);
    setSession({ token });
  }, []);

  const refreshProfile = useCallback(
    async ({ silent = false }: IRefreshProfileOptions = {}) => {
      if (!silent) setLoadingProfile(true);
      setProfileError(false);
      try {
        const response = await MeService.getMe();
        setProfile(response.value);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          signOut();
        } else {
          setProfileError(true);
        }
      } finally {
        setLoadingProfile(false);
      }
    },
    [signOut],
  );

  useEffect(() => {
    if (session.token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      refreshProfile();
    } else {
      setLoadingProfile(false);
    }
  }, [session.token, refreshProfile]);

  const value = useMemo(
    () => ({
      ...session,
      profile,
      isAuthenticated: !!session.token,
      loadingProfile,
      profileError,
      signIn,
      signOut,
      refreshProfile,
    }),
    [
      session,
      profile,
      loadingProfile,
      profileError,
      signIn,
      signOut,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
