import { TOKEN_KEY } from "@/constants/storage";

export const authStorage = {
  get: () => ({
    token: localStorage.getItem(TOKEN_KEY),
  }),
  set: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
};
