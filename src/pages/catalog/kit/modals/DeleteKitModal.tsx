import { Button, Flex, Modal, Typography } from "antd";
import { useDeleteKit } from "@/hooks/kit/useDeleteKit";
import type { IDeleteKitModalProps } from "@/interfaces/IKit";

export const DeleteKitModal = ({
  open,
  onClose,
  reload,
  kit,
}: IDeleteKitModalProps) => {
  const { deleteKit, loading } = useDeleteKit();
  const itemCount = kit?.items.length ?? 0;

  const handleConfirm = () => {
    if (!kit) return;

    deleteKit(kit.id, () => {
      reload?.();
      onClose();
    });
  };

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={onClose}>Cancelar</Button>
      <Button type="primary" danger onClick={handleConfirm} loading={loading}>
        Eliminar
      </Button>
    </Flex>
  );

  return (
    <Modal open={open} onCancel={onClose} centered width={420} footer={footer}>
      <Typography.Title level={4}>Eliminar kit</Typography.Title>
      <Typography.Paragraph className="mb-2!">
        ¿Seguro que deseas eliminar <strong>{kit?.name}</strong> (
        <span className="font-mono">{kit?.code}</span>)?
      </Typography.Paragraph>
      <Typography.Paragraph type="secondary" className="text-[13px]">
        {itemCount > 0
          ? `Sus ${itemCount} ${itemCount === 1 ? "equipo queda" : "equipos quedan"} libres para asignarse a otro kit. Los equipos no se eliminan.`
          : "El kit no tiene equipos asignados."}
      </Typography.Paragraph>
    </Modal>
  );
};
