import { Tag } from "antd";
import { EmptyValue } from "@/components/ui/EmptyValue";
import { EQUIPMENT_CONDITION_DISPLAY } from "@/constants/equipment";
import type { TableColumnsType } from "antd";
import type { EquipmentCondition } from "@/interfaces/IEquipment";
import type { ILoanItem } from "@/interfaces/ILoan";

const renderCondition = (condition?: EquipmentCondition | null) => {
  if (!condition) return <EmptyValue />;

  const { label, color } = EQUIPMENT_CONDITION_DISPLAY[condition];
  return (
    <Tag className="m-0!" color={color}>
      {label}
    </Tag>
  );
};

export const LOAN_DETAIL_ITEM_COLUMNS: TableColumnsType<ILoanItem> = [
  {
    title: "#",
    key: "index",
    width: 48,
    align: "center",
    render: (_, __, index) => index + 1,
  },
  {
    title: "Código",
    dataIndex: "code",
    width: 110,
    render: (code: string) => (
      <span className="font-mono text-stone-600">{code}</span>
    ),
  },
  {
    title: "Equipo",
    dataIndex: "name",
  },
  {
    title: "Estado recojo",
    dataIndex: "pickupCondition",
    render: renderCondition,
  },
  {
    title: "Estado devolución",
    dataIndex: "returnCondition",
    render: renderCondition,
  },
];
