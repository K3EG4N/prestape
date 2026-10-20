import { Button, Flex, Form, Modal, Typography } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormHeader } from "@/pages/auth/AuthFormHeader";
import { FormInput } from "@/components/form/FormInput";
import { useAuthContext } from "@/context/useAuthContext";
import { useCompleteProfile } from "@/hooks/me/useCompleteProfile";
import { completeProfileSchema } from "@/schemas/person/complete.profile.schema";
import { COMPLETE_PROFILE_DEFAULT_VALUES } from "@/constants/person";
import type { CompleteProfileSchema } from "@/schemas/person/complete.profile.schema";
import type { ICompleteProfileModalProps } from "@/interfaces/IAuth";

export const CompleteProfileModal = ({ open }: ICompleteProfileModalProps) => {
  const { profile, signOut } = useAuthContext();
  const { completeProfile, loading } = useCompleteProfile();
  const { control, handleSubmit } = useForm<CompleteProfileSchema>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: COMPLETE_PROFILE_DEFAULT_VALUES,
    mode: "onTouched",
  });

  const submit = handleSubmit((data) => completeProfile(data));

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={signOut}>Cerrar sesión</Button>
      <Button type="primary" onClick={submit} loading={loading}>
        Guardar y continuar
      </Button>
    </Flex>
  );

  return (
    <Modal
      open={open}
      centered
      width={520}
      closable={false}
      keyboard={false}
      mask={{ closable: false, blur: true }}
      footer={footer}
      styles={{ mask: { backgroundColor: "rgba(245, 245, 244, 0.45)" } }}
    >
      <AuthFormHeader
        title="Completa tu perfil"
        subtitle="Necesitamos tus datos personales para que puedas usar el sistema."
      />

      <Typography.Text type="secondary" className="mt-2 mb-6 block text-[13px]">
        Sesión iniciada como <strong>{profile?.email}</strong>
      </Typography.Text>

      <Form id="complete-profile-form" onFinish={submit}>
        <FormInput
          name="documentNumber"
          control={control}
          label="DNI"
          required
          size="middle"
          inputMode="numeric"
          maxLength={8}
          style={{ height: "34px" }}
        />
        <Flex gap={20}>
          <FormInput
            name="firstName"
            control={control}
            label="Primer nombre"
            required
            size="middle"
            style={{ height: "34px" }}
          />
          <FormInput
            name="middleName"
            control={control}
            label="Segundo nombre"
            size="middle"
            style={{ height: "34px" }}
          />
        </Flex>
        <Flex gap={20}>
          <FormInput
            name="paternalSurname"
            control={control}
            label="Apellido paterno"
            required
            size="middle"
            style={{ height: "34px" }}
          />
          <FormInput
            name="maternalSurname"
            control={control}
            label="Apellido materno"
            size="middle"
            style={{ height: "34px" }}
          />
        </Flex>
        <FormInput
          name="phone"
          control={control}
          label="Celular"
          required
          size="middle"
          inputMode="numeric"
          maxLength={9}
          style={{ height: "34px" }}
        />
      </Form>
    </Modal>
  );
};
