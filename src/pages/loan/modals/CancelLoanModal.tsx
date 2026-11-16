import { Button, Flex, Modal, Typography } from "antd";
import { useCancelLoan } from "@/hooks/loan/useCancelLoan";
import type { ICancelLoanModalProps } from "@/interfaces/ILoan";

export const CancelLoanModal = ({
  open,
  onClose,
  reload,
  loan,
}: ICancelLoanModalProps) => {
  const { cancelLoan, loading } = useCancelLoan();

  const handleConfirm = () => {
    if (!loan) return;

    cancelLoan(loan.id, () => {
      reload?.();
      onClose();
    });
  };

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={onClose}>Volver</Button>
      <Button type="primary" danger onClick={handleConfirm} loading={loading}>
        Cancelar
      </Button>
    </Flex>
  );

  return (
    <Modal open={open} onCancel={onClose} centered width={420} footer={footer}>
      <Typography.Title level={4}>Cancelar préstamo</Typography.Title>
      <Typography.Paragraph className="mb-2!">
        ¿Seguro que deseas cancelar el préstamo{" "}
        <span className="font-mono">{loan?.code}</span>?
      </Typography.Paragraph>
      <Typography.Paragraph type="secondary" className="text-[13px]">
        Los equipos volverán a estar disponibles para otros préstamos. Esta
        acción no se puede deshacer.
      </Typography.Paragraph>
    </Modal>
  );
};
