import { Tag } from "antd";
import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type { IEquipment } from "@/interfaces/ICatalog";

export const equipmentColumns: IDataTableColumn<IEquipment>[] = [
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
    dataIndex: "name",
    render: (_, item) => (
      <div className="flex flex-col">
        <span className="font-medium">{item.name}</span>
        <span className="text-sm text-stone-500">{item.description}</span>
      </div>
    ),
  },
  {
    key: "code",
    title: "Código",
    dataIndex: "code",
    render: (_, item) => (
      <span className="font-mono text-stone-600">{item.code}</span>
    ),
  },
  {
    key: "serial",
    title: "Serie",
    dataIndex: "serial",
    render: (_, item) => (
      <span className="font-mono text-stone-600">{item.serial}</span>
    ),
  },
  { key: "category", title: "Categoría", dataIndex: "category" },
  {
    key: "available",
    title: "Disponibilidad",
    render: (_, item) =>
      item.available ? (
        <Tag color="green">Disponible</Tag>
      ) : (
        <Tag>Prestado</Tag>
      ),
  },
];
