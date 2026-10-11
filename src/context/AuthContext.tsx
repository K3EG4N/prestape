import type { AuthContextValue } from "@/interfaces/IAuth";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextValue | null>(null);
