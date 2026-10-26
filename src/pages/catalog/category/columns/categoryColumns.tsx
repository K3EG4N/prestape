import { RowActions } from "@/components/table/RowActions";
import { EmptyValue } from "@/components/ui/EmptyValue";
import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type { ICategory, ICategoryRowHandlers } from "@/interfaces/ICatalog";

export const getCategoryColumns = (
  handlers: ICategoryRowHandlers,
  canManage: boolean,
): IDataTableColumn<ICategory>[] => [
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
    title: "Categoría",
    dataIndex: "name",
  },
  {
    key: "description",
    title: "Descripción",
    render: (_, category) => category.description ?? <EmptyValue />,
  },
  {
    key: "equipmentCount",
    title: "Equipos asociados",
    dataIndex: "equipmentCount",
    align: "center",
  },
  ...(canManage
    ? [
        {
          title: "Acciones",
          key: "actions",
          width: "w-24",
          align: "center",
          render: (_, category) => (
            <RowActions
              actions={[
                {
                  key: "edit",
                  label: "Editar",
                  icon: "edit",
                  onClick: () => handlers.onEdit(category),
                },
                {
                  key: "delete",
                  label: "Eliminar",
                  icon: "delete",
                  danger: true,
                  onClick: () => handlers.onDelete(category),
                },
              ]}
            />
          ),
        } satisfies IDataTableColumn<ICategory>,
      ]
    : []),
];
