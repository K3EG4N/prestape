import { Tag, Tooltip } from "antd";
import { RowActions } from "@/components/table/RowActions";
import { LOAN_STATUS_DISPLAY, LOAN_VISIBLE_ITEMS } from "@/constants/loan";
import { formatDateTime } from "@/utils/date";
import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type { ILoan, ILoanRowHandlers } from "@/interfaces/ILoan";

export const getLoanColumns = (
  handlers: ILoanRowHandlers,
  canManage: boolean,
): IDataTableColumn<ILoan>[] => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    render: (_, __, index) => index + 1,
    width: "w-16",
    align: "center",
  },
  {
    key: "code",
    title: "Código",
    render: (_, loan) => (
      <span className="font-mono text-stone-600">{loan.code}</span>
    ),
  },
  {
    key: "requester",
    title: "Solicitante",
    className: "w-56",
    render: (_, loan) => <span>{loan.requester.fullName}</span>,
  },
  {
    key: "items",
    title: "Equipos",
    className: "w-120",
    hideable: true,
    render: (_, loan) => {
      const visible = loan.items.slice(0, LOAN_VISIBLE_ITEMS);
      const hidden = loan.items.slice(LOAN_VISIBLE_ITEMS);

      return (
        <div className="flex flex-wrap gap-1">
          {visible.map((item) => (
            <Tag key={item.id} className="m-0!">
              {item.name}
            </Tag>
          ))}
          {hidden.length > 0 && (
            <Tooltip title={hidden.map((item) => item.name).join(", ")}>
              <Tag className="m-0! cursor-default">+{hidden.length}</Tag>
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    key: "scheduledPickupAt",
    title: "Recojo",
    hideable: true,
    render: (_, loan) => formatDateTime(loan.scheduledPickupAt),
  },
  {
    key: "scheduledReturnAt",
    title: "Devolución",
    hideable: true,
    render: (_, loan) => formatDateTime(loan.scheduledReturnAt),
  },
  {
    key: "status",
    title: "Estado",
    hideable: true,
    render: (_, loan) => {
      const { label, color } = LOAN_STATUS_DISPLAY[loan.status];
      return (
        <Tag color={color} className="m-0!">
          {label}
        </Tag>
      );
    },
  },
  {
    title: "Acciones",
    key: "actions",
    width: "w-24",
    align: "center",
    render: (_, loan) => (
      <RowActions
        actions={[
          {
            key: "view",
            label: "Ver detalle",
            icon: "view",
            onClick: () => handlers.onView(loan),
          },
          {
            key: "pickup",
            label: "Registrar recojo",
            icon: "check",
            hidden: !canManage || loan.status !== "PENDING_PICKUP",
            onClick: () => handlers.onRegisterPickup(loan),
          },
          {
            key: "return",
            label: "Registrar devolución",
            icon: "history",
            hidden:
              !canManage ||
              (loan.status !== "ACTIVE" && loan.status !== "OVERDUE"),
            onClick: () => handlers.onRegisterReturn(loan),
          },
          {
            key: "cancel",
            label: "Cancelar",
            icon: "delete",
            danger: true,
            hidden: loan.status !== "PENDING_PICKUP",
            onClick: () => handlers.onCancel(loan),
          },
        ]}
      />
    ),
  },
];
