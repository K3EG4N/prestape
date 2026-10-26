import { useEffect } from "react";
import { Button, Flex, Form, Modal, Tag, Typography } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { FormTextArea } from "@/components/form/FormTextArea";
import { useUpdateEquipment } from "@/hooks/equipment/useUpdateEquipment";
import { useCategoryOptions } from "@/hooks/category/useCategoryOptions";
import {
  EQUIPMENT_AVAILABILITY_OPTIONS,
  EQUIPMENT_CONDITION_OPTIONS,
  MANUAL_AVAILABILITY_OPTIONS,
} from "@/constants/equipment";
import { editEquipmentSchema } from "@/schemas/equipment/edit.equipment.schema";
import { toEditEquipmentFormValues } from "@/utils/equipment";
import type { EditEquipmentSchema } from "@/schemas/equipment/edit.equipment.schema";
import type { IEditEquipmentModalProps } from "@/interfaces/IEquipment";

export const EditEquipmentModal = ({
  open,
  onClose,
  reload,
  equipment,
}: IEditEquipmentModalProps) => {
  const { updateEquipment, loading } = useUpdateEquipment();
  const { categories } = useCategoryOptions();
  const { control, reset, handleSubmit } = useForm<EditEquipmentSchema>({
    resolver: zodResolver(editEquipmentSchema),
    mode: "onTouched",
  });
  const isLoaned = equipment?.availability === "LOANED";

  useEffect(() => {
    if (equipment) reset(toEditEquipmentFormValues(equipment));
  }, [equipment, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) => {
    if (!equipment) return;

    updateEquipment(equipment.id, data, () => {
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
          Editar equipo
        </Typography.Title>
        {equipment && (
          <Tag className="m-0! font-mono" color="blue">
            {equipment.code}
          </Tag>
        )}
      </Flex>
      <Typography.Paragraph type="secondary">
        Actualice los datos, la disponibilidad y la condición del equipo.
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
            name="availability"
            label="Disponibilidad"
            disabled={isLoaned}
            options={
              isLoaned
                ? EQUIPMENT_AVAILABILITY_OPTIONS
                : MANUAL_AVAILABILITY_OPTIONS
            }
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
