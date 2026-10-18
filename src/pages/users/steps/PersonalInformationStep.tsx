import { Flex } from "antd";
import { useFormContext } from "react-hook-form";
import { FormInput } from "@/components/form/FormInput";
import type { CreateUserSchema } from "@/schemas/user/create.user.schema";

export const PersonalInformationStep = () => {
  const { control } = useFormContext<CreateUserSchema>();

  return (
    <>
      <FormInput
        name="person.documentNumber"
        control={control}
        required
        label="DNI"
        size="middle"
        inputMode="numeric"
        maxLength={8}
        style={{ height: "34px" }}
      />
      <Flex gap={20}>
        <FormInput
          name="person.firstName"
          control={control}
          required
          label="Primer nombre"
          size="middle"
          style={{ height: "34px" }}
        />
        <FormInput
          name="person.middleName"
          control={control}
          label="Segundo nombre"
          size="middle"
          style={{ height: "34px" }}
        />
      </Flex>
      <Flex gap={20}>
        <FormInput
          name="person.paternalSurname"
          control={control}
          required
          label="Apellido paterno"
          size="middle"
          style={{ height: "34px" }}
        />
        <FormInput
          name="person.maternalSurname"
          control={control}
          label="Apellido materno"
          size="middle"
          style={{ height: "34px" }}
        />
      </Flex>
      <FormInput
        name="person.phone"
        control={control}
        required
        label="Celular"
        size="middle"
        inputMode="numeric"
        maxLength={9}
        style={{ height: "34px" }}
      />
    </>
  );
};
