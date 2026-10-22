import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type { ICategory } from "@/interfaces/ICatalog";

export const categoryColumns: IDataTableColumn<ICategory>[] = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    render: (_, __, index) => index + 1,
    width: "w-16",
    align: "center",
  },
  { key: "name", title: "Categoría", dataIndex: "name" },
  { key: "description", title: "Descripción", dataIndex: "description" },
  {
    key: "equipmentCount",
    title: "Equipos",
    dataIndex: "equipmentCount",
    align: "center",
  },
];
