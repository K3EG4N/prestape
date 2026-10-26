import { Tag, Tooltip } from "antd";
import { RowActions } from "@/components/table/RowActions";
import { EmptyValue } from "@/components/ui/EmptyValue";
import {
  EQUIPMENT_AVAILABILITY_DISPLAY,
  EQUIPMENT_CONDITION_DISPLAY,
} from "@/constants/equipment";
import { formatDate } from "@/utils/date";
import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type {
  IEquipment,
  IEquipmentRowHandlers,
} from "@/interfaces/IEquipment";

export const getEquipmentColumns = (
  handlers: IEquipmentRowHandlers,
  canManage: boolean,
): IDataTableColumn<IEquipment>[] => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    render: (_, __, index) => index + 1,
    width: "w-16",
    align: "center",
  },
  {
    key: "name",
    title: "Equipo",
    className: "w-1/4",
    render: (_, equipment) => (
      <div className="flex flex-col">
        <span className="font-medium">{equipment.name}</span>
        {equipment.description && (
          <span className="truncate text-sm text-stone-500">
            {equipment.description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "code",
    title: "Código",
    render: (_, equipment) => (
      <span className="font-mono text-stone-600">{equipment.code}</span>
    ),
  },
  {
    key: "serialNumber",
    title: "Serie",
    hideable: true,
    render: (_, equipment) => (
      <span className="font-mono text-stone-600">{equipment.serialNumber}</span>
    ),
  },
  {
    key: "category",
    title: "Categoría",
    hideable: true,
    render: (_, equipment) => equipment.category.name,
  },
  {
    key: "availability",
    title: "Disponibilidad",
    hideable: true,
    render: (_, equipment) => {
      const { label, color } =
        EQUIPMENT_AVAILABILITY_DISPLAY[equipment.availability];
      return (
        <Tag color={color} className="m-0!">
          {label}
        </Tag>
      );
    },
  },
  {
    key: "condition",
    title: "Condición",
    hideable: true,
    render: (_, equipment) => {
      const { label, color } = EQUIPMENT_CONDITION_DISPLAY[equipment.condition];
      const tag = (
        <Tag color={color} className="m-0!">
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
  {
    key: "createdAt",
    title: "Registro",
    hideable: true,
    render: (_, equipment) =>
      equipment.createdAt ? formatDate(equipment.createdAt) : <EmptyValue />,
  },
  ...(canManage
    ? [
        {
          title: "Acciones",
          key: "actions",
          width: "w-24",
          align: "center",
          render: (_, equipment) => (
            <RowActions
              actions={[
                {
                  key: "edit",
                  label: "Editar",
                  icon: "edit",
                  onClick: () => handlers.onEdit(equipment),
                },
                {
                  key: "delete",
                  label: "Eliminar",
                  icon: "delete",
                  danger: true,
                  onClick: () => handlers.onDelete(equipment),
                },
              ]}
            />
          ),
        } satisfies IDataTableColumn<IEquipment>,
      ]
    : []),
];
