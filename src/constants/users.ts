import { INITIAL_BASE_FILTERS } from "./filters";
import type { ICreateUserStep, IUserFilters } from "@/interfaces/IUser";
import type { DefaultValues } from "react-hook-form";
import type { CreateUserSchema } from "@/schemas/user/create.user.schema";

export const INITIAL_USER_FILTERS: IUserFilters = {
  ...INITIAL_BASE_FILTERS,
  roles: [],
  createdAt: null,
};

export const USER_PROFILE_STATUS = {
  completed: { label: "Activo", icon: "check", className: "text-green-500" },
  incomplete: {
    label: "Perfil incompleto",
    icon: "warning",
    className: "text-yellow-500",
  },
} as const;

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
