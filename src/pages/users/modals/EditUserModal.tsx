import { useEffect } from "react";
import { Button, Flex, Form, Modal, Tag, Typography } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";
import { editUserSchema } from "@/schemas/user/edit.user.schema";
import { toEditUserFormValues } from "@/utils/user";
import { FormInput } from "@/components/form/FormInput";
import type { EditUserSchema } from "@/schemas/user/edit.user.schema";
import type { IEditUserModalProps } from "@/interfaces/IUser";

export const EditUserModal = ({
  open,
  onClose,
  reload,
  user,
}: IEditUserModalProps) => {
  const { updateUser, loading: saving } = useUpdateUser();
  const { control, reset, handleSubmit } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (user) reset(toEditUserFormValues(user));
  }, [user, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) => {
    if (!user) return;

    updateUser(user.id, data, () => {
      reload?.();
      handleClose();
    });
  });

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={handleClose}>Cancelar</Button>
      <Button type="primary" onClick={submit} loading={saving}>
        Actualizar
      </Button>
    </Flex>
  );

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      centered
      width={500}
      footer={footer}
    >
      <Flex align="center" gap={10}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Editar usuario
        </Typography.Title>
        {user?.person && (
          <Tag className="m-0! font-mono" color={"blue"}>
            {user.person.code}
          </Tag>
        )}
      </Flex>
      <Typography.Paragraph type="secondary">
        Actualice los datos de la cuenta y la información personal.
      </Typography.Paragraph>

      <Form id="edit-user-form" onFinish={submit}>
        <FormInput
          name="email"
          control={control}
          label="Correo"
          required
          size="middle"
          style={{ height: "34px" }}
        />
        <FormInput
          name="person.documentNumber"
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
            name="person.firstName"
            control={control}
            label="Primer nombre"
            required
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
            label="Apellido paterno"
            required
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
