import { INITIAL_BASE_FILTERS } from "./filters";
import type {
  ICreateUserStep,
  IUserFilters,
  UserStatusFilter,
} from "@/interfaces/IUser";
import type { DefaultValues } from "react-hook-form";
import type { CreateUserSchema } from "@/schemas/user/create.user.schema";

export const INITIAL_USER_FILTERS: IUserFilters = {
  ...INITIAL_BASE_FILTERS,
  roles: [],
  statuses: [],
  createdAt: null,
};

export const USER_STATUS_DISPLAY = {
  active: { label: "Activo", icon: "check", className: "text-green-500" },
  incomplete: {
    label: "Perfil incompleto",
    icon: "warning",
    className: "text-yellow-500",
  },
  suspended: {
    label: "Suspendido",
    icon: "suspend",
    className: "text-red-500",
  },
} as const;

export const USER_STATUS_FILTER_OPTIONS: {
  value: UserStatusFilter;
  label: string;
}[] = [
  { value: "ACTIVE", label: USER_STATUS_DISPLAY.active.label },
  { value: "INCOMPLETE", label: USER_STATUS_DISPLAY.incomplete.label },
  { value: "SUSPENDED", label: USER_STATUS_DISPLAY.suspended.label },
];

export const CREATE_USER_STEPS: ICreateUserStep[] = [
  {
    title: "Cuenta",
    content: "Datos de la cuenta",
    fields: ["email", "password", "confirmPassword", "role"],
  },
  {
    title: "Persona",
    content: "Información personal",
    fields: [
      "person.documentNumber",
      "person.firstName",
      "person.middleName",
      "person.paternalSurname",
      "person.maternalSurname",
      "person.phone",
    ],
  },
];

export const CREATE_USER_DEFAULT_VALUES: DefaultValues<CreateUserSchema> = {
  email: "",
  password: "",
  confirmPassword: "",
  role: undefined,
  person: {
    documentNumber: "",
    firstName: "",
    middleName: "",
    paternalSurname: "",
    maternalSurname: "",
    phone: "",
  },
};
