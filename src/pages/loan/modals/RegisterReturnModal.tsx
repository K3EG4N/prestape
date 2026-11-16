import { useState } from "react";
import { Button, Flex, Modal, Table, Tag, Typography } from "antd";
import { useAuthContext } from "@/context/useAuthContext";
import { useRegisterReturn } from "@/hooks/loan/useRegisterReturn";
import { LOAN_STATUS_DISPLAY } from "@/constants/loan";
import { formatDateTime } from "@/utils/date";
import { getLoanItemConditionColumns } from "../columns/loanItemConditionColumns";
import { LoanDetailField } from "../components/LoanDetailField";
import type { EquipmentCondition } from "@/interfaces/IEquipment";
import type { IRegisterReturnModalProps } from "@/interfaces/ILoan";

export const RegisterReturnModal = ({
  open,
  onClose,
  reload,
  loan,
}: IRegisterReturnModalProps) => {
  const { profile } = useAuthContext();
  const { registerReturn, loading } = useRegisterReturn();
  const [conditions, setConditions] = useState<
    Record<number, EquipmentCondition>
  >({});
  const overdue = loan?.status === "OVERDUE";

  const handleClose = () => {
    setConditions({});
    onClose();
  };

  const handleConfirm = () => {
    if (!loan) return;

    registerReturn(
      loan.id,
      {
        items: loan.items.map((item) => ({
          equipmentId: item.id,
          condition:
            conditions[item.id] ??
            item.pickupCondition ??
            item.currentCondition,
        })),
      },
      () => {
        reload?.();
        handleClose();
      },
    );
  };

  const columns = getLoanItemConditionColumns(
    (item) =>
      conditions[item.id] ?? item.pickupCondition ?? item.currentCondition,
    (item, condition) =>
      setConditions((current) => ({ ...current, [item.id]: condition })),
  );

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={handleClose}>Volver</Button>
      <Button type="primary" onClick={handleConfirm} loading={loading}>
        Registrar devolución
      </Button>
    </Flex>
  );

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      centered
      width={560}
      footer={footer}
    >
      {loan && (
        <div className="flex flex-col gap-3">
          <div>
            <Flex align="center" gap={10}>
              <Typography.Title level={4} style={{ margin: 0 }}>
                Registrar devolución
              </Typography.Title>
              <Tag className="m-0! font-mono" color="blue">
                {loan.code}
              </Tag>
              {overdue && (
                <Tag className="m-0!" color={LOAN_STATUS_DISPLAY.OVERDUE.color}>
                  {LOAN_STATUS_DISPLAY.OVERDUE.label}
                </Tag>
              )}
            </Flex>
            <Typography.Text type="secondary" className="text-[13px]">
              Revisa el estado en que se devuelve cada equipo. Los dañados pasan
              a mantenimiento.
            </Typography.Text>
          </div>

          <div className="grid grid-cols-2 gap-x-8 rounded-lg bg-(--ant-color-fill-quaternary) px-4 py-2">
            <LoanDetailField label="Solicitante">
              <span className="font-semibold">{loan.requester.fullName}</span>
            </LoanDetailField>
            <LoanDetailField label="Código">
              <span className="font-mono">{loan.requester.code}</span>
            </LoanDetailField>
            <LoanDetailField label="Programado">
              <span className={overdue ? "text-red-500" : undefined}>
                {formatDateTime(loan.scheduledReturnAt)}
              </span>
            </LoanDetailField>
            <LoanDetailField label="Recibido por">
              {profile?.person?.shortName}
            </LoanDetailField>
          </div>

          <Table
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={loan.items}
            pagination={false}
          />
        </div>
      )}
    </Modal>
  );
};
