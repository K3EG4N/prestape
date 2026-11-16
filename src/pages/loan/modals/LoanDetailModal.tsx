import { Button, Flex, Modal, Table, Tag, Typography } from "antd";
import { EmptyValue } from "@/components/ui/EmptyValue";
import { LOAN_STATUS_DISPLAY } from "@/constants/loan";
import { formatDateTime } from "@/utils/date";
import { LOAN_DETAIL_ITEM_COLUMNS } from "../columns/loanDetailItemColumns";
import { LoanDetailField } from "../components/LoanDetailField";
import { LoanDetailSection } from "../components/LoanDetailSection";
import type {
  ILoanDetailModalProps,
  ILoanHandoverSectionProps,
} from "@/interfaces/ILoan";

const HandoverSection = ({
  title,
  scheduledAt,
  actualAt,
  actualLabel,
  handledBy,
  handledByLabel,
  late = false,
}: ILoanHandoverSectionProps) => (
  <LoanDetailSection title={title}>
    <div className="flex flex-col">
      <LoanDetailField label="Programado">
        {formatDateTime(scheduledAt)}
      </LoanDetailField>
      <LoanDetailField label={actualLabel}>
        {actualAt ? (
          <span className={late ? "text-red-500" : undefined}>
            {formatDateTime(actualAt)}
          </span>
        ) : (
          <EmptyValue />
        )}
      </LoanDetailField>
      <LoanDetailField label={handledByLabel}>
        {handledBy ?? <EmptyValue />}
      </LoanDetailField>
    </div>
  </LoanDetailSection>
);

export const LoanDetailModal = ({
  open,
  onClose,
  loan,
}: ILoanDetailModalProps) => {
  const status = loan ? LOAN_STATUS_DISPLAY[loan.status] : null;

  const footer = (
    <Flex justify="end">
      <Button onClick={onClose}>Cerrar</Button>
    </Flex>
  );

  return (
    <Modal open={open} onCancel={onClose} centered width={680} footer={footer}>
      {loan && status && (
        <div className="flex flex-col gap-4">
          <div>
            <Flex align="center" gap={10}>
              <Typography.Title level={4} style={{ margin: 0 }}>
                Detalle del préstamo
              </Typography.Title>
              <Tag className="m-0! font-mono" color="blue">
                {loan.code}
              </Tag>
              <Tag className="m-0!" color={status.color}>
                {status.label}
              </Tag>
            </Flex>
            <Typography.Text type="secondary" className="text-[13px]">
              Registrado el {formatDateTime(loan.createdAt)}
            </Typography.Text>
          </div>

          <LoanDetailSection title="Datos generales">
            <div className="grid grid-cols-2 gap-x-8">
              <LoanDetailField label="Solicitante">
                <span className="font-semibold">{loan.requester.fullName}</span>
              </LoanDetailField>
              <LoanDetailField label="Código">
                <span className="font-mono">{loan.requester.code}</span>
              </LoanDetailField>
            </div>
          </LoanDetailSection>

          <LoanDetailSection title="Equipos">
            <Table
              size="small"
              rowKey="id"
              columns={LOAN_DETAIL_ITEM_COLUMNS}
              dataSource={loan.items}
              pagination={false}
            />
          </LoanDetailSection>

          <div className="grid grid-cols-2 gap-x-8">
            <HandoverSection
              title="Recojo"
              scheduledAt={loan.scheduledPickupAt}
              actualAt={loan.pickedUpAt}
              actualLabel="Entregado"
              handledBy={loan.deliveredBy}
              handledByLabel="Entregado por"
            />
            <HandoverSection
              title="Devolución"
              scheduledAt={loan.scheduledReturnAt}
              actualAt={loan.returnedAt}
              actualLabel="Recibido"
              handledBy={loan.receivedBy}
              handledByLabel="Recibido por"
              late={loan.status === "RETURNED_LATE"}
            />
          </div>

          <LoanDetailSection title="Observaciones">
            <p className="m-0 text-[13px] text-stone-800">
              {loan.notes ?? <EmptyValue />}
            </p>
          </LoanDetailSection>
        </div>
      )}
    </Modal>
  );
};
