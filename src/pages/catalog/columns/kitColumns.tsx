import { Tag, Tooltip } from "antd";
import { KIT_VISIBLE_ITEMS } from "@/constants/catalog";
import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type { IKit } from "@/interfaces/ICatalog";

export const kitColumns: IDataTableColumn<IKit>[] = [
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
    dataIndex: "name",
    className: "w-1/4",
    render: (_, kit) => (
      <div className="flex flex-col">
        <span className="font-medium">{kit.name}</span>
        <span className="text-sm text-stone-500">{kit.description}</span>
      </div>
    ),
  },
  {
    key: "code",
    title: "Código",
    dataIndex: "code",
    render: (_, kit) => (
      <span className="font-mono text-stone-600">{kit.code}</span>
    ),
  },
  {
    key: "serial",
    title: "Serie",
    dataIndex: "serial",
    render: (_, kit) => (
      <span className="font-mono text-stone-600">{kit.serial}</span>
    ),
  },
  {
    key: "items",
    title: "Contenido",
    render: (_, kit) => {
      const visible = kit.items.slice(0, KIT_VISIBLE_ITEMS);
      const hidden = kit.items.slice(KIT_VISIBLE_ITEMS);

      return (
        <div className="flex flex-wrap gap-1">
          {visible.map((item) => (
            <Tag key={item} className="m-0!">
              {item}
            </Tag>
          ))}
          {hidden.length > 0 && (
            <Tooltip title={hidden.join(", ")}>
              <Tag className="m-0! cursor-default">+{hidden.length}</Tag>
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    key: "available",
    title: "Disponibilidad",
    render: (_, kit) =>
      kit.available ? <Tag color="green">Disponible</Tag> : <Tag>Prestado</Tag>,
  },
];
