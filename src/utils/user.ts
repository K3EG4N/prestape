import type { EditUserSchema } from "@/schemas/user/edit.user.schema";
import type { IUser } from "@/interfaces/IUser";

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
