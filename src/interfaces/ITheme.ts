import type { ReactNode } from "react";

export type ThemePreference = "light" | "dark" | "system";

export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
}

export interface IThemeProviderProps {
  children: ReactNode;
}

export interface IThemeOption {
  value: ThemePreference;
  label: string;
  icon: ReactNode;
}
