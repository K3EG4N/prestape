import { useState } from "react";
import { App, Button } from "antd";
import { PageHeader } from "@/components/PageHeader";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { DataTable } from "@/components/table/DataTable";
import { FilterDropdown } from "@/components/table/filters/FilterDropdown";
import { useUsers } from "@/hooks/users/useUsers";
import { useRoles } from "@/hooks/roles/useRoles";
import { CreateUserModal } from "./modals/CreateUserModal";
import { EditUserModal } from "./modals/EditUserModal";
import { getUserColumns } from "./columns/userColumns";
import { getIcon } from "@/utils/getIcon";
import type { IUser, IUserRowHandlers } from "@/interfaces/IUser";

export const UsersPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const { roles: roleOptions } = useRoles();
  const { message } = App.useApp();
  const { data, pagination, filters, loading, changeFilter, reload } =
    useUsers();

  const comingSoon = () => message.info("Próximamente");

  const handlers: IUserRowHandlers = {
    onEdit: setEditingUser,
    onChangeRoles: comingSoon,
    onDelete: comingSoon,
  };

  const columns = getUserColumns(handlers);

  return (
    <section className="flex h-full min-h-0 flex-col gap-4">
      <div>
        <AppBreadcrumb />
        <PageHeader
          title="Usuarios"
          text="Crea encargados y gestiona el acceso de todas las cuentas."
        />
      </div>

      <DataTable
        enableSearch
        searchPlaceholder="Buscar por nombre o correo..."
        data={data.content}
        columns={columns}
        rowKey={(u) => u.id}
        loading={loading}
        onSearchChange={(value) => changeFilter("search", value)}
        pagination={{ ...pagination, total: data.totalElements }}
        leftActions={
          <>
            <Button
              type="primary"
              icon={getIcon("user-add")}
              onClick={() => setOpenCreateModal(true)}
            >
              Crear usuario
            </Button>
            <Button icon={getIcon("refresh")} onClick={reload}>
              Actualizar
            </Button>
          </>
        }
        rightActions={
          <FilterDropdown
            items={[
              {
                type: "options",
                key: "roles",
                label: "Rol",
                description: "Filtra por uno o más roles",
                icon: getIcon("user"),
                options: roleOptions.map((r) => ({
                  value: r.name,
                  label: r.externalName,
                })),
                value: filters.roles,
                onChange: (value) => changeFilter("roles", value),
              },
              {
                type: "dateRange",
                key: "createdAt",
                label: "Fecha de registro",
                description: "Usuarios registrados entre estas fechas",
                icon: getIcon("calendar"),
                value: filters.createdAt,
                onChange: (value) => changeFilter("createdAt", value),
              },
            ]}
          />
        }
      />

      <CreateUserModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        reload={reload}
      />

      <EditUserModal
        open={editingUser !== null}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        reload={reload}
      />
    </section>
  );
};
