import type { UserStatus } from "./IUser";

export interface IUserProfileRole {
  name: string;
  externalName: string;
}

export interface IUserProfilePerson {
  code: string;
  displayName: string;
  documentNumber: string;
}

export interface IUserProfile {
  userId: number;
  email: string;
  status: UserStatus;
  profileCompleted: boolean;
  roles: IUserProfileRole[];
  person: IUserProfilePerson | null;
}
