import { FormInput } from "@/components/form/FormInput";
import { FormTextArea } from "@/components/form/FormTextArea";
import { CREATE_CATEGORY_DEFAULT_VALUES } from "@/constants/category";
import { createCategorySchema } from "@/schemas/category/create.category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Modal, Typography } from "antd";
import { useForm } from "react-hook-form";
import type { CreateCategorySchema } from "@/schemas/category/create.category.schema";
import type { IDisclosure } from "@/interfaces/IDisclosure";

export const CreateCategoryModal = ({ open, onClose }: IDisclosure) => {
  const { control, reset, handleSubmit } = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: CREATE_CATEGORY_DEFAULT_VALUES,
    mode: "onTouched",
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) => console.log(data));

  return (
    <Modal
      open={open}
      centered
      width={500}
      onCancel={handleClose}
      onOk={submit}
      okText="Registrar"
      cancelText="Cancelar"
    >
      <Typography.Title level={4}>Crear categoría</Typography.Title>
      <Typography.Paragraph type="secondary">
        Complete los campos para crear una nueva categoría.
      </Typography.Paragraph>
      <Form layout="vertical">
        <FormInput
          required
          control={control}
          name="name"
          label="Nombre"
          size="medium"
          style={{ height: "34px" }}
        />
        <FormTextArea
          showCount
          control={control}
          name="description"
          label="Descripción"
          autoSize={{ minRows: 5, maxRows: 5 }}
          size="medium"
          maxLength={255}
        />
      </Form>
    </Modal>
  );
};
