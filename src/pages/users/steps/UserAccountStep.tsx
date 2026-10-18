import { Flex } from "antd";
import { useFormContext } from "react-hook-form";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { capitalize } from "@/utils/string";
import { ADMIN_ROLE } from "@/constants/roles";
import type { CreateUserSchema } from "@/schemas/user/create.user.schema";
import type { IUserAccountStepProps } from "@/interfaces/IUser";

export const UserAccountStep = ({ roleOptions }: IUserAccountStepProps) => {
  const { control, trigger } = useFormContext<CreateUserSchema>();

  const revalidatePasswords = () =>
    void trigger(["password", "confirmPassword"]);

  return (
    <>
      <FormInput
        name="email"
        control={control}
        required
        label="Correo"
        size="middle"
        style={{ height: "34px" }}
      />
      <Flex gap={20}>
        <FormInput
          password
          name="password"
          control={control}
          required
          label="Contraseña"
          size="middle"
          onBlur={revalidatePasswords}
          style={{ height: "34px" }}
        />
        <FormInput
          password
          name="confirmPassword"
          control={control}
          required
          label="Confirmar contraseña"
          size="middle"
          onBlur={revalidatePasswords}
          style={{ height: "34px" }}
        />
      </Flex>
      <FormSelect
        control={control}
        name="role"
        label="Rol"
        required
        placeholder="Seleccione un rol"
        options={roleOptions
          .filter((r) => r.name !== ADMIN_ROLE)
          .map((r) => ({ label: capitalize(r.externalName), value: r.id }))}
        size="middle"
        style={{ height: "34px" }}
      />
    </>
  );
};
