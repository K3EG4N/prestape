import { Tag } from "antd";
import { EQUIPMENT_CONDITION_DISPLAY } from "@/constants/equipment";
import type { TableColumnsType } from "antd";
import type { EquipmentCondition } from "@/interfaces/IEquipment";
import type { ILendableEquipmentOption } from "@/interfaces/ILoan";

export const LOAN_ITEM_COLUMNS: TableColumnsType<ILendableEquipmentOption> = [
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
    title: "Estado",
    dataIndex: "condition",
    width: 120,
    render: (condition: EquipmentCondition) => {
      const { label, color } = EQUIPMENT_CONDITION_DISPLAY[condition];
      return (
        <Tag className="m-0!" color={color}>
          {label}
        </Tag>
      );
    },
  },
];
