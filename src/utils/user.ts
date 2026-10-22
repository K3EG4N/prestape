import type { EditUserSchema } from "@/schemas/user/edit.user.schema";
import { USER_STATUS_DISPLAY } from "@/constants/users";
import { toInstantRange } from "@/utils/date";
import type {
  IUser,
  IUserFilterParams,
  IUserFilters,
} from "@/interfaces/IUser";

export const toEditUserFormValues = (user: IUser): EditUserSchema => ({
  email: user.email,
  person: {
    documentNumber: user.person?.documentNumber ?? "",
    firstName: user.person?.firstName ?? "",
    middleName: user.person?.middleName ?? "",
    paternalSurname: user.person?.paternalSurname ?? "",
    maternalSurname: user.person?.maternalSurname ?? "",
    phone: user.person?.phone ?? "",
  },
});

export const getUserStatusDisplay = (user: IUser) => {
  if (user.status === "SUSPENDED") return USER_STATUS_DISPLAY.suspended;
  if (!user.profileCompleted) return USER_STATUS_DISPLAY.incomplete;
  return USER_STATUS_DISPLAY.active;
};

export const buildUserFilterParams = (
  filters: IUserFilters,
): IUserFilterParams => {
  const createdAt = toInstantRange(filters.createdAt);

  return {
    search: filters.search || undefined,
    roles: filters.roles,
    statuses: filters.statuses,
    createdFrom: createdAt.from,
    createdTo: createdAt.to,
  };
};
