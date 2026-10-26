import { useEffect } from "react";
import { Button, Flex, Form, Modal, Tag, Typography } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextArea } from "@/components/form/FormTextArea";
import { useUpdateKit } from "@/hooks/kit/useUpdateKit";
import { useEquipmentOptions } from "@/hooks/equipment/useEquipmentOptions";
import { editKitSchema } from "@/schemas/kit/edit.kit.schema";
import { toEditKitFormValues } from "@/utils/kit";
import type { EditKitSchema } from "@/schemas/kit/edit.kit.schema";
import type { IEditKitModalProps } from "@/interfaces/IKit";

export const EditKitModal = ({
  open,
  onClose,
  reload,
  kit,
}: IEditKitModalProps) => {
  const { updateKit, loading } = useUpdateKit();
  const { equipments } = useEquipmentOptions(open, kit?.id);
  const { control, reset, handleSubmit } = useForm<EditKitSchema>({
    resolver: zodResolver(editKitSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (kit) reset(toEditKitFormValues(kit));
  }, [kit, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) => {
    if (!kit) return;

    updateKit(kit.id, data, () => {
      reload?.();
      handleClose();
    });
  });

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={handleClose}>Cancelar</Button>
      <Button type="primary" onClick={submit} loading={loading}>
        Actualizar
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
      <Flex align="center" gap={10}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Editar kit
        </Typography.Title>
        {kit && (
          <Tag className="m-0! font-mono" color="blue">
            {kit.code}
          </Tag>
        )}
      </Flex>
      <Typography.Paragraph type="secondary">
        Actualice los datos del kit y los equipos que contiene.
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
