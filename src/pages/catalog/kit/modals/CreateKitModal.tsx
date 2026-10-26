import { Button, Flex, Form, Modal, Typography } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextArea } from "@/components/form/FormTextArea";
import { useCreateKit } from "@/hooks/kit/useCreateKit";
import { useEquipmentOptions } from "@/hooks/equipment/useEquipmentOptions";
import { CREATE_KIT_DEFAULT_VALUES } from "@/constants/kit";
import { createKitSchema } from "@/schemas/kit/create.kit.schema";
import type { CreateKitSchema } from "@/schemas/kit/create.kit.schema";
import type { IDisclosure } from "@/interfaces/IDisclosure";

export const CreateKitModal = ({ open, onClose, reload }: IDisclosure) => {
  const { createKit, loading } = useCreateKit();
  const { equipments } = useEquipmentOptions(open);
  const { control, reset, handleSubmit } = useForm<CreateKitSchema>({
    resolver: zodResolver(createKitSchema),
    defaultValues: CREATE_KIT_DEFAULT_VALUES,
    mode: "onTouched",
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) =>
    createKit(data, () => {
      reload?.();
      handleClose();
    }),
  );

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={handleClose}>Cancelar</Button>
      <Button type="primary" onClick={submit} loading={loading}>
        Registrar
      </Button>
    </Flex>
  );

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      centered
      width={600}
      footer={footer}
    >
      <Typography.Title level={4}>Crear kit</Typography.Title>
      <Typography.Paragraph type="secondary">
        El código del kit se genera automáticamente al registrarlo. Solo se
        muestran los equipos que aún no pertenecen a otro kit.
      </Typography.Paragraph>

      <Form layout="vertical" onFinish={submit}>
        <FormInput
          required
          control={control}
          name="name"
          label="Nombre"
          size="middle"
          style={{ height: "34px" }}
        />
        <FormSelect
          required
          control={control}
          name="equipmentIds"
          label="Equipos"
          mode="multiple"
          showSearch
          optionFilterProp="label"
          options={equipments.map((e) => ({
            label: `${e.name} · ${e.description}`,
            value: e.id,
          }))}
          size="middle"
        />
        <FormTextArea
          showCount
          control={control}
          name="description"
          label="Descripción"
          autoSize={{ minRows: 3, maxRows: 3 }}
          size="middle"
          maxLength={255}
        />
      </Form>
    </Modal>
  );
};
