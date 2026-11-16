import { Select } from "antd";
import { EQUIPMENT_CONDITION_OPTIONS } from "@/constants/equipment";
import type { TableColumnsType } from "antd";
import type { EquipmentCondition } from "@/interfaces/IEquipment";
import type { IFilterOption } from "@/interfaces/IFilter";
import type { ILoanItem } from "@/interfaces/ILoan";

export const getLoanItemConditionColumns = (
  getCondition: (item: ILoanItem) => EquipmentCondition,
  onConditionChange: (item: ILoanItem, condition: EquipmentCondition) => void,
  options: IFilterOption[] = EQUIPMENT_CONDITION_OPTIONS,
): TableColumnsType<ILoanItem> => [
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
    key: "condition",
    width: 140,
    render: (_, item) => (
      <Select
        size="small"
        className="w-full"
        value={getCondition(item)}
        options={options}
        onChange={(condition) => onConditionChange(item, condition)}
      />
    ),
  },
];
