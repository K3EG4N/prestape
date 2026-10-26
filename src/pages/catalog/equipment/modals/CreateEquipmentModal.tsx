import { Button, Flex, Form, Modal, Typography } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextArea } from "@/components/form/FormTextArea";
import { useCreateEquipment } from "@/hooks/equipment/useCreateEquipment";
import { useCategoryOptions } from "@/hooks/category/useCategoryOptions";
import {
  CREATE_EQUIPMENT_DEFAULT_VALUES,
  EQUIPMENT_CONDITION_OPTIONS,
} from "@/constants/equipment";
import { createEquipmentSchema } from "@/schemas/equipment/create.equipment.schema";
import type { CreateEquipmentSchema } from "@/schemas/equipment/create.equipment.schema";
import type { IDisclosure } from "@/interfaces/IDisclosure";

export const CreateEquipmentModal = ({ open, onClose, reload }: IDisclosure) => {
  const { createEquipment, loading } = useCreateEquipment();
  const { categories } = useCategoryOptions();
  const { control, reset, handleSubmit } = useForm<CreateEquipmentSchema>({
    resolver: zodResolver(createEquipmentSchema),
    defaultValues: CREATE_EQUIPMENT_DEFAULT_VALUES,
    mode: "onTouched",
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) =>
    createEquipment(data, () => {
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
      <Typography.Title level={4}>Crear equipo</Typography.Title>
      <Typography.Paragraph type="secondary">
        El código del equipo se genera automáticamente al registrarlo.
      </Typography.Paragraph>

      <Form layout="vertical" onFinish={submit}>
        <div className="grid grid-cols-2 gap-x-4">
          <FormInput
            required
            control={control}
            name="name"
            label="Nombre"
            size="middle"
            style={{ height: "34px" }}
          />
          <FormInput
            required
            control={control}
            name="serialNumber"
            label="Serie"
            size="middle"
            style={{ height: "34px" }}
          />
          <FormSelect
            required
            control={control}
            name="categoryId"
            label="Categoría"
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
            size="middle"
          />
          <FormSelect
            required
            control={control}
            name="condition"
            label="Condición"
            options={EQUIPMENT_CONDITION_OPTIONS}
            size="middle"
          />
        </div>
        <FormTextArea
          showCount
          control={control}
          name="description"
          label="Descripción"
          autoSize={{ minRows: 3, maxRows: 3 }}
          size="middle"
          maxLength={255}
        />
        <FormTextArea
          showCount
          control={control}
          name="conditionNotes"
          label="Observaciones de la condición"
          autoSize={{ minRows: 2, maxRows: 2 }}
          size="middle"
          maxLength={255}
        />
      </Form>
    </Modal>
  );
};
