import { Button, Flex, Modal, Typography } from "antd";
import { useUserStatus } from "@/hooks/users/useUserStatus";
import type { ISuspendUserModalProps } from "@/interfaces/IUser";

export const SuspendUserModal = ({
  open,
  onClose,
  reload,
  user,
}: ISuspendUserModalProps) => {
  const { suspendUser, loading } = useUserStatus();
  const name = user?.person?.fullName ?? user?.email ?? "";

  const handleConfirm = () => {
    if (!user) return;

    suspendUser(user.id, () => {
      reload?.();
      onClose();
    });
  };

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={onClose}>Cancelar</Button>
      <Button type="primary" danger onClick={handleConfirm} loading={loading}>
        Suspender
      </Button>
    </Flex>
  );

  return (
    <Modal open={open} onCancel={onClose} centered width={420} footer={footer}>
      <Typography.Title level={4}>Suspender usuario</Typography.Title>
      <Typography.Paragraph className="mb-2!">
        ¿Seguro que deseas suspender a <strong>{name}</strong>?
      </Typography.Paragraph>
      <Typography.Paragraph type="secondary" className="text-[13px]">
        Podrá iniciar sesión y consultar sus solicitudes, pero no realizar
        nuevas ni modificar información. Puedes reactivarla cuando quieras.
      </Typography.Paragraph>
    </Modal>
  );
};
