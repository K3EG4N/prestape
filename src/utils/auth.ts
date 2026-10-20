import type { IUserProfile } from "@/interfaces/IUserProfile";

export const hasAnyRole = (profile: IUserProfile | null, roles: string[]) => {
  if (!profile) return false;

  const allowed = roles.map((role) => role.toUpperCase());
  return profile.roles.some((role) =>
    allowed.includes(role.name.toUpperCase()),
  );
};
