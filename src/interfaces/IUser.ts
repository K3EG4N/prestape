import type { IRole } from "./IRole";
import type {
  ICreatePersonRequest,
  IPersonSummary,
  IUpdatePersonRequest,
} from "./IPerson";
import type { IDisclosure } from "./IDisclosure";
import type { DateRange } from "./IFilter";
import type { IBaseFilters, IBaseListRequest } from "./IBaseFilter";
import type { Path } from "react-hook-form";
import type { CreateUserSchema } from "@/schemas/user/create.user.schema";

export type UserStatus = "ACTIVE" | "SUSPENDED";

export type UserStatusFilter = "ACTIVE" | "INCOMPLETE" | "SUSPENDED";

export interface IUser {
  id: number;
  email: string;
  roles: IRole[];
  status: UserStatus;
  profileCompleted: boolean;
  person: IPersonSummary | null;
  createdAt: string;
}

export interface IUserRowHandlers {
  onEdit: (user: IUser) => void;
//   onChangeRoles: (user: IUser) => void;
  onSuspend: (user: IUser) => void;
  onReactivate: (user: IUser) => void;
}

export interface IUserFilters extends IBaseFilters {
  roles: string[];
  statuses: string[];
  createdAt: DateRange | null;
}

export interface IUserListRequest extends IBaseListRequest {
  roles?: string[];
  statuses?: string[];
  createdFrom?: string;
  createdTo?: string;
}

export type IUserFilterParams = Omit<IUserListRequest, "page" | "size">;

export interface ICreateUserRequest {
    email: string;
    password: string;
    confirmPassword: string;
    role: number;
    person: ICreatePersonRequest;
}

export interface ICreateUserStep {
  title: string;
  content: string;
  fields: Path<CreateUserSchema>[];
}

export interface IUserAccountStepProps {
  roleOptions: IRole[];
}

export interface IUpdateUserRequest {
  email: string;
  person: IUpdatePersonRequest;
}

export interface IEditUserModalProps extends IDisclosure {
  user: IUser | null;
}

export interface ISuspendUserModalProps extends IDisclosure {
  user: IUser | null;
}

export interface IReactivateUserModalProps extends IDisclosure {
  user: IUser | null;
}
