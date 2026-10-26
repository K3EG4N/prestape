import { Button, Flex, Modal, Typography } from "antd";
import { useDeleteCategory } from "@/hooks/category/useDeleteCategory";
import type { IDeleteCategoryModalProps } from "@/interfaces/ICatalog";

export const DeleteCategoryModal = ({
  open,
  onClose,
  reload,
  category,
}: IDeleteCategoryModalProps) => {
  const { deleteCategory, loading } = useDeleteCategory();
  const equipmentCount = category?.equipmentCount ?? 0;
  const hasEquipment = equipmentCount > 0;

  const handleConfirm = () => {
    if (!category) return;

    deleteCategory(category.id, () => {
      reload?.();
      onClose();
    });
  };

  const footer = hasEquipment ? (
    <Flex justify="end">
      <Button onClick={onClose}>Entendido</Button>
    </Flex>
  ) : (
    <Flex gap={12} justify="end">
      <Button onClick={onClose}>Cancelar</Button>
      <Button type="primary" danger onClick={handleConfirm} loading={loading}>
        Eliminar
      </Button>
    </Flex>
  );

  return (
    <Modal open={open} onCancel={onClose} centered width={420} footer={footer}>
      <Typography.Title level={4}>Eliminar categoría</Typography.Title>
      {hasEquipment ? (
        <>
          <Typography.Paragraph className="mb-2!">
            No puedes eliminar <strong>{category?.name}</strong> porque tiene{" "}
            <strong>
              {equipmentCount} {equipmentCount === 1 ? "equipo" : "equipos"}
            </strong>{" "}
            asociados.
          </Typography.Paragraph>
          <Typography.Paragraph type="secondary" className="text-[13px]">
            Mueve esos equipos a otra categoría y vuelve a intentarlo.
          </Typography.Paragraph>
        </>
      ) : (
        <>
          <Typography.Paragraph className="mb-2!">
            ¿Seguro que deseas eliminar <strong>{category?.name}</strong>?
          </Typography.Paragraph>
          <Typography.Paragraph type="secondary" className="text-[13px]">
            La categoría dejará de aparecer en el catálogo y no podrá asignarse
            a nuevos equipos.
          </Typography.Paragraph>
        </>
      )}
    </Modal>
  );
};
