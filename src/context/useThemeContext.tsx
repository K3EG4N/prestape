import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
};
