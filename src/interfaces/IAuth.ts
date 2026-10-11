import type { IUserProfile } from "./IUserProfile";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IRegisterRequest {
  type: "student" | "teacher";
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterResponse {
  token: string;
}

export interface AuthContextValue {
  token: string | null;
  profile: IUserProfile | null;
  isAuthenticated: boolean;
  loadingProfile: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
  refreshProfile: () => Promise<void>;
}
