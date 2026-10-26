import { Tag, Tooltip } from "antd";
import { RowActions } from "@/components/table/RowActions";
import { KIT_AVAILABILITY_DISPLAY, KIT_VISIBLE_ITEMS } from "@/constants/kit";
import { formatDate } from "@/utils/date";
import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type { IKit, IKitRowHandlers } from "@/interfaces/IKit";

export const getKitColumns = (
  handlers: IKitRowHandlers,
  canManage: boolean,
): IDataTableColumn<IKit>[] => [
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
    title: "Kit",
    className: "w-1/4",
    render: (_, kit) => (
      <div className="flex flex-col">
        <span className="font-medium">{kit.name}</span>
        {kit.description && (
          <span className="truncate text-sm text-stone-500">
            {kit.description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "code",
    title: "Código",
    render: (_, kit) => (
      <span className="font-mono text-stone-600">{kit.code}</span>
    ),
  },
  {
    key: "items",
    title: "Contenido",
    className: "w-1/4",
    render: (_, kit) => {
      const visible = kit.items.slice(0, KIT_VISIBLE_ITEMS);
      const hidden = kit.items.slice(KIT_VISIBLE_ITEMS);

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
    key: "availability",
    title: "Disponibilidad",
    render: (_, kit) => {
      const { label, color } = KIT_AVAILABILITY_DISPLAY[kit.availability];
      return (
        <Tag color={color} className="m-0!">
          {label}
        </Tag>
      );
    },
  },
  {
    key: "createdAt",
    title: "Registro",
    render: (_, kit) => formatDate(kit.createdAt),
  },
  ...(canManage
    ? [
        {
          title: "Acciones",
          key: "actions",
          width: "w-24",
          align: "center",
          render: (_, kit) => (
            <RowActions
              actions={[
                {
                  key: "edit",
                  label: "Editar",
                  icon: "edit",
                  onClick: () => handlers.onEdit(kit),
                },
                {
                  key: "delete",
                  label: "Eliminar",
                  icon: "delete",
                  danger: true,
                  onClick: () => handlers.onDelete(kit),
                },
              ]}
            />
          ),
        } satisfies IDataTableColumn<IKit>,
      ]
    : []),
];
