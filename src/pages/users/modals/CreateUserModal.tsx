import { useState } from "react";
import { Button, Flex, Form, Modal, Typography } from "antd";
import { FormProvider, get, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoles } from "@/hooks/roles/useRoles";
import { useCreateUser } from "@/hooks/users/useCreateUser";
import { createUserSchema } from "@/schemas/user/create.user.schema";
import { CREATE_USER_DEFAULT_VALUES, CREATE_USER_STEPS } from "@/constants/users";
import { FormSteps } from "@/components/form/FormSteps";
import { UserAccountStep } from "../steps/UserAccountStep";
import { PersonalInformationStep } from "../steps/PersonalInformationStep";
import type { CreateUserSchema } from "@/schemas/user/create.user.schema";
import type { IDisclosure } from "@/interfaces/IDisclosure";
import type { FieldErrors } from "react-hook-form";

export const CreateUserModal = ({ onClose, open, reload }: IDisclosure) => {
  const { roles: roleOptions } = useRoles();
  const { createUser, loading } = useCreateUser();
  const [current, setCurrent] = useState(0);
  const methods = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: CREATE_USER_DEFAULT_VALUES,
    mode: "onTouched",
  });

  const isLastStep = current === CREATE_USER_STEPS.length - 1;

  const handleClose = () => {
    methods.reset();
    setCurrent(0);
    onClose();
  };

  const next = async () => {
    const isValid = await methods.trigger(CREATE_USER_STEPS[current].fields);
    if (isValid) setCurrent((step) => step + 1);
  };

  const back = () => setCurrent((step) => step - 1);

  const onCreated = () => {
    reload?.();
    handleClose();
  };

  const goToFirstError = (errors: FieldErrors<CreateUserSchema>) => {
    const step = CREATE_USER_STEPS.findIndex((s) =>
      s.fields.some((field) => get(errors, field)),
    );
    if (step !== -1) setCurrent(step);
  };

  const submit = methods.handleSubmit(
    (data) => createUser(data, onCreated),
    goToFirstError,
  );

  const footer = (
    <Flex gap={12} justify="end">
      {current === 0 ? (
        <Button onClick={handleClose}>Cancelar</Button>
      ) : (
        <Button onClick={back}>Anterior</Button>
      )}

      <Flex gap={12}>
        {isLastStep ? (
          <Button type="primary" onClick={submit} loading={loading}>
            Registrar
          </Button>
        ) : (
          <Button type="primary" onClick={next}>
            Siguiente
          </Button>
        )}
      </Flex>
    </Flex>
  );

  const showStep = () => {
    switch (current) {
      case 0:
        return <UserAccountStep roleOptions={roleOptions} />;
      default:
        return <PersonalInformationStep />;
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      centered
      width={500}
      footer={footer}
    >
      <Typography.Title level={4}>Crear usuario</Typography.Title>
      <Typography.Paragraph type="secondary">
        Complete los campos para crear un nuevo usuario.
      </Typography.Paragraph>
      <FormSteps current={current} items={CREATE_USER_STEPS} />
      <FormProvider {...methods}>
        <Form id={"create-user-form"} onFinish={isLastStep ? submit : next}>
          {showStep()}
        </Form>
      </FormProvider>
    </Modal>
  );
};
