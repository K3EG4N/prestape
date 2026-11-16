import { useState } from "react";
import { Button, Flex, Modal, Table, Tag, Typography } from "antd";
import { useAuthContext } from "@/context/useAuthContext";
import { useRegisterPickup } from "@/hooks/loan/useRegisterPickup";
import { DELIVERABLE_CONDITION_OPTIONS } from "@/constants/equipment";
import { formatDateTime } from "@/utils/date";
import { getLoanItemConditionColumns } from "../columns/loanItemConditionColumns";
import { LoanDetailField } from "../components/LoanDetailField";
import type { EquipmentCondition } from "@/interfaces/IEquipment";
import type { IRegisterPickupModalProps } from "@/interfaces/ILoan";

export const RegisterPickupModal = ({
  open,
  onClose,
  reload,
  loan,
}: IRegisterPickupModalProps) => {
  const { profile } = useAuthContext();
  const { registerPickup, loading } = useRegisterPickup();
  const [conditions, setConditions] = useState<
    Record<number, EquipmentCondition>
  >({});

  const handleClose = () => {
    setConditions({});
    onClose();
  };

  const handleConfirm = () => {
    if (!loan) return;

    registerPickup(
      loan.id,
      {
        items: loan.items.map((item) => ({
          equipmentId: item.id,
          condition: conditions[item.id] ?? item.currentCondition,
        })),
      },
      () => {
        reload?.();
        handleClose();
      },
    );
  };

  const columns = getLoanItemConditionColumns(
    (item) => conditions[item.id] ?? item.currentCondition,
    (item, condition) =>
      setConditions((current) => ({ ...current, [item.id]: condition })),
    DELIVERABLE_CONDITION_OPTIONS,
  );

  const footer = (
    <Flex gap={12} justify="end">
      <Button onClick={handleClose}>Volver</Button>
      <Button type="primary" onClick={handleConfirm} loading={loading}>
        Registrar recojo
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
                Registrar recojo
              </Typography.Title>
              <Tag className="m-0! font-mono" color="blue">
                {loan.code}
              </Tag>
            </Flex>
            <Typography.Text type="secondary" className="text-[13px]">
              Verifica el estado de cada equipo antes de entregarlo.
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
              {formatDateTime(loan.scheduledPickupAt)}
            </LoanDetailField>
            <LoanDetailField label="Entregado por">
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
