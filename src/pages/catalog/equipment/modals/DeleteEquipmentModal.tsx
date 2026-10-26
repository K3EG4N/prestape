import { Button, Flex, Modal, Typography } from "antd";
import { useDeleteEquipment } from "@/hooks/equipment/useDeleteEquipment";
import type { IDeleteEquipmentModalProps } from "@/interfaces/IEquipment";

export const DeleteEquipmentModal = ({
  open,
  onClose,
  reload,
  equipment,
}: IDeleteEquipmentModalProps) => {
  const { deleteEquipment, loading } = useDeleteEquipment();
  const isLoaned = equipment?.availability === "LOANED";

  const handleConfirm = () => {
    if (!equipment) return;

    deleteEquipment(equipment.id, () => {
      reload?.();
      onClose();
    });
  };

  const footer = isLoaned ? (
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
      <Typography.Title level={4}>Eliminar equipo</Typography.Title>
      {isLoaned ? (
        <>
          <Typography.Paragraph className="mb-2!">
            No puedes eliminar <strong>{equipment?.name}</strong> porque está
            prestado.
          </Typography.Paragraph>
          <Typography.Paragraph type="secondary" className="text-[13px]">
            Espera a que sea devuelto y vuelve a intentarlo.
          </Typography.Paragraph>
        </>
      ) : (
        <>
          <Typography.Paragraph className="mb-2!">
            ¿Seguro que deseas eliminar <strong>{equipment?.name}</strong> (
            <span className="font-mono">{equipment?.code}</span>)?
          </Typography.Paragraph>
          <Typography.Paragraph type="secondary" className="text-[13px]">
            El equipo dejará de aparecer en el catálogo y no podrá prestarse.
            Si solo dejó de usarse, puedes marcarlo como De baja.
          </Typography.Paragraph>
        </>
      )}
    </Modal>
  );
};
