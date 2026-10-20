import { Button, Flex, Modal, Typography } from "antd";
import { useUserStatus } from "@/hooks/users/useUserStatus";
import type { IReactivateUserModalProps } from "@/interfaces/IUser";

export const ReactivateUserModal = ({
  open,
  onClose,
  reload,
  user,
}: IReactivateUserModalProps) => {
  const { reactivateUser, loading } = useUserStatus();
  const name = user?.person?.fullName ?? user?.email ?? "";

  const handleConfirm = () => {
    if (!user) return;

    reactivateUser(user.id, () => {
      reload?.();
      onClose();
    });
  };

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={onClose}>Cancelar</Button>
      <Button type="primary" onClick={handleConfirm} loading={loading}>
        Reactivar
      </Button>
    </Flex>
  );

  return (
    <Modal open={open} onCancel={onClose} centered width={420} footer={footer}>
      <Typography.Title level={4}>Reactivar usuario</Typography.Title>
      <Typography.Paragraph className="mb-2!">
        ¿Deseas reactivar la cuenta de <strong>{name}</strong>?
      </Typography.Paragraph>
      <Typography.Paragraph type="secondary" className="text-[13px]">
        Podrá volver a realizar solicitudes y usar el sistema con normalidad.
      </Typography.Paragraph>
    </Modal>
  );
};
