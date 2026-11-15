import type { ThemeContextValue } from "@/interfaces/ITheme";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextValue | null>(null);
