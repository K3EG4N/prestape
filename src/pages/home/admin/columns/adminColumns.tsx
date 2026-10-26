import { Tag, Tooltip } from "antd";
import {
  CATEGORY_VISIBLE_ITEMS,
  DASHBOARD_COLORS,
} from "@/constants/dashboard";
import {
  EQUIPMENT_AVAILABILITY_DISPLAY,
  EQUIPMENT_CONDITION_DISPLAY,
} from "@/constants/equipment";
import { formatTime } from "@/utils/date";
import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type {
  IAttentionEquipment,
  ICategoryStock,
  IDueReturn,
  ITopEquipment,
} from "@/interfaces/IDashboard";

const indexColumn = <T,>(): IDataTableColumn<T> => ({
  key: "index",
  title: "#",
  width: "w-8",
  className: "text-stone-400 tabular-nums",
  render: (_, __, index) => index + 1,
});

export const categoryStockColumns: IDataTableColumn<ICategoryStock>[] = [
  indexColumn<ICategoryStock>(),
  {
    key: "name",
    title: "Categoría",
    width: "w-36",
    render: (_, category) => <div className="truncate">{category.name}</div>,
  },
  {
    key: "equipmentNames",
    title: "Equipos",
    render: (_, category) => {
      const visible = category.equipmentNames.slice(0, CATEGORY_VISIBLE_ITEMS);
      const hidden = category.equipmentNames.slice(CATEGORY_VISIBLE_ITEMS);

      if (category.equipmentNames.length === 0) {
        return <span className="text-stone-400">Sin equipos</span>;
      }

      return (
        <div className="flex flex-nowrap gap-1 overflow-hidden">
          {visible.map((name) => (
            <Tag key={name} className="m-0! truncate">
              {name}
            </Tag>
          ))}
          {hidden.length > 0 && (
            <Tooltip title={hidden.join(", ")}>
              <Tag className="m-0! shrink-0 cursor-default">
                +{hidden.length}
              </Tag>
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    key: "total",
    title: "Total",
    dataIndex: "total",
    width: "w-16",
    align: "center",
    className: "font-medium text-stone-800 tabular-nums",
  },
  {
    key: "available",
    title: "Disponibles",
    width: "w-24",
    align: "center",
    className: "text-stone-500 tabular-nums",
    render: (_, category) => `${category.available}/${category.total}`,
  },
];

export const attentionColumns: IDataTableColumn<IAttentionEquipment>[] = [
  indexColumn<IAttentionEquipment>(),
  {
    key: "name",
    title: "Equipo",
    render: (_, equipment) => (
      <div className="truncate">{equipment.name}</div>
    ),
  },
  {
    key: "code",
    title: "Código",
    dataIndex: "code",
    width: "w-20",
    className: "font-mono text-xs text-stone-500",
  },
  {
    key: "category",
    title: "Categoría",
    dataIndex: "category",
    width: "w-28",
    className: "truncate text-stone-400",
  },
  {
    key: "availability",
    title: "Disponibilidad",
    width: "w-32",
    render: (_, equipment) => {
      const { label, color } =
        EQUIPMENT_AVAILABILITY_DISPLAY[equipment.availability];
      return (
        <Tag variant="filled" color={color} className="m-0!">
          {label}
        </Tag>
      );
    },
  },
  {
    key: "condition",
    title: "Condición",
    width: "w-24",
    render: (_, equipment) => {
      const { label, color } = EQUIPMENT_CONDITION_DISPLAY[equipment.condition];
      const tag = (
        <Tag variant="filled" color={color} className="m-0!">
          {label}
        </Tag>
      );
      return equipment.conditionNotes ? (
        <Tooltip title={equipment.conditionNotes}>{tag}</Tooltip>
      ) : (
        tag
      );
    },
  },
];

export const topEquipmentColumns: IDataTableColumn<ITopEquipment>[] = [
  indexColumn<ITopEquipment>(),
  {
    key: "name",
    title: "Equipo",
    render: (_, equipment) => (
      <div className="truncate">{equipment.name}</div>
    ),
  },
  {
    key: "code",
    title: "Código",
    dataIndex: "code",
    width: "w-20",
    className: "font-mono text-xs text-stone-500",
  },
  {
    key: "serial",
    title: "Serie",
    dataIndex: "serial",
    width: "w-28",
    className: "truncate font-mono text-xs text-stone-500",
  },
  {
    key: "category",
    title: "Categoría",
    dataIndex: "category",
    width: "w-24",
    className: "truncate text-stone-400",
  },
  {
    key: "loans",
    title: "Préstamos",
    dataIndex: "loans",
    width: "w-20",
    align: "end",
    className: "font-medium text-stone-800 tabular-nums",
  },
];

export const dueReturnColumns: IDataTableColumn<IDueReturn>[] = [
  indexColumn<IDueReturn>(),
  {
    key: "dueAt",
    title: "Hora",
    width: "w-16",
    render: (_, item) => (
      <span
        className="rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums"
        style={{
          color: DASHBOARD_COLORS.primary,
          backgroundColor: DASHBOARD_COLORS.primaryBg,
        }}
      >
        {formatTime(item.dueAt)}
      </span>
    ),
  },
  {
    key: "item",
    title: "Equipo",
    render: (_, item) => <div className="truncate">{item.item}</div>,
  },
  {
    key: "code",
    title: "Código",
    dataIndex: "code",
    width: "w-20",
    className: "font-mono text-xs text-stone-500",
  },
  {
    key: "serial",
    title: "Serie",
    dataIndex: "serial",
    width: "w-28",
    className: "truncate font-mono text-xs text-stone-500",
  },
  {
    key: "borrower",
    title: "Responsable",
    width: "w-28",
    render: (_, item) => (
      <div className="truncate text-stone-500">{item.borrower}</div>
    ),
  },
];
