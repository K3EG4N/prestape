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

export interface IUser {
  id: number;
  email: string;
  roles: IRole[];
  profileCompleted: boolean;
  person: IPersonSummary | null;
  createdAt: string;
}

export interface IUserRowHandlers {
  onEdit: (user: IUser) => void;
  onChangeRoles: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

export interface IUserFilters extends IBaseFilters {
  roles: string[];
  createdAt: DateRange | null;
}

export interface IUserListRequest extends IBaseListRequest {
  roles?: string[];
  createdFrom?: string;
  createdTo?: string;
}

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
