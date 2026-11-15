import { useCallback, useEffect, useMemo, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { ThemeContext } from "./ThemeContext";
import { DARK_MEDIA_QUERY, DEFAULT_THEME, THEME_KEY } from "@/constants/theme";
import type {
  IThemeProviderProps,
  ResolvedTheme,
  ThemePreference,
} from "@/interfaces/ITheme";

const readPreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

const systemTheme = (): ResolvedTheme =>
  window.matchMedia(DARK_MEDIA_QUERY).matches ? "dark" : "light";

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [preference, setPreferenceState] = useState(readPreference);
  const [system, setSystem] = useState<ResolvedTheme>(systemTheme);

  const resolvedTheme = preference === "system" ? system : preference;

  useEffect(() => {
    const media = window.matchMedia(DARK_MEDIA_QUERY);
    const onChange = () => setSystem(media.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      return;
    }
  }, []);

  const value = useMemo(
    () => ({ preference, resolvedTheme, setPreference }),
    [preference, resolvedTheme, setPreference],
  );

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm:
            resolvedTheme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
