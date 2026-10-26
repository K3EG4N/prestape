import { useEffect } from "react";
import { Button, Flex, Form, Modal, Typography } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { FormTextArea } from "@/components/form/FormTextArea";
import { useUpdateCategory } from "@/hooks/category/useUpdateCategory";
import { editCategorySchema } from "@/schemas/category/edit.category.schema";
import { toEditCategoryFormValues } from "@/utils/category";
import type { EditCategorySchema } from "@/schemas/category/edit.category.schema";
import type { IEditCategoryModalProps } from "@/interfaces/ICatalog";

export const EditCategoryModal = ({
  open,
  onClose,
  reload,
  category,
}: IEditCategoryModalProps) => {
  const { updateCategory, loading } = useUpdateCategory();
  const { control, reset, handleSubmit } = useForm<EditCategorySchema>({
    resolver: zodResolver(editCategorySchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (category) reset(toEditCategoryFormValues(category));
  }, [category, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) => {
    if (!category) return;

    updateCategory(category.id, data, () => {
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
      width={500}
      footer={footer}
    >
      <Typography.Title level={4}>Editar categoría</Typography.Title>
      <Typography.Paragraph type="secondary">
        Actualice el nombre y la descripción de la categoría.
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
        <FormTextArea
          showCount
          control={control}
          name="description"
          label="Descripción"
          autoSize={{ minRows: 5, maxRows: 5 }}
          size="middle"
          maxLength={255}
        />
      </Form>
    </Modal>
  );
};
