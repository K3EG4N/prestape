import { Tag } from "antd";
import { EmptyValue } from "@/components/ui/EmptyValue";
import { RowActions } from "@/components/table/RowActions";
import { getIcon } from "@/utils/getIcon";
import { USER_PROFILE_STATUS } from "@/constants/users";
import { capitalize, formatPhone, getInitials } from "@/utils/string";
import { formatDate } from "@/utils/date";
import type { IDataTableColumn } from "@/interfaces/IDataTable";
import type { IUser, IUserRowHandlers } from "@/interfaces/IUser";

export const getUserColumns = (
  handlers: IUserRowHandlers,
): IDataTableColumn<IUser>[] => [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    render: (_, __, index) => index + 1,
    width: "w-16",
    align: "center",
  },
  {
    title: "Nombre",
    key: "name",
    className: "w-1/5",
    render: (_, user) => (
      <div className="flex gap-3 items-center">
        <div className="flex items-center justify-center size-10 min-w-10 min-h-10 bg-[#E6F4FF] text-blue-500 rounded font-medium">
          {getInitials(user.person?.fullName ?? user.email)}
        </div>
        <div className="flex flex-col">
          <span className="font-medium">
            {user.person?.fullName ?? (
              <span className="text-stone-400">Sin nombre</span>
            )}
          </span>
          <span className="text-gray-500 text-sm">{user.email}</span>
        </div>
      </div>
    ),
  },
  {
    title: "Código",
    key: "code",
    render: (_, user) =>
      user.person ? (
        <span className="font-mono text-stone-600">{user.person.code}</span>
      ) : (
        <EmptyValue />
      ),
  },
  {
    title: "DNI",
    key: "documentNumber",
    render: (_, user) => user.person?.documentNumber ?? <EmptyValue />,
  },
  {
    title: "Celular",
    key: "phone",
    render: (_, user) =>
      user.person ? formatPhone(user.person.phone) : <EmptyValue />,
  },
  {
    title: "Rol",
    key: "roles",
    className: "w-1/6",
    render: (_, user) => (
      <div className="flex flex-wrap gap-1">
        {user.roles.map((role) => (
          <Tag key={role.name} className="m-0!">
            {capitalize(role.externalName)}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: "Estado",
    key: "profileCompleted",
    render: (_, user) => {
      const { label, icon, className } = user.profileCompleted
        ? USER_PROFILE_STATUS.completed
        : USER_PROFILE_STATUS.incomplete;

      return (
        <span
          className={`flex items-center gap-1.5 whitespace-nowrap ${className}`}
        >
          {getIcon(icon)}
          {label}
        </span>
      );
    },
  },
  {
    title: "Registro",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, user) => formatDate(user.createdAt),
  },
  {
    title: "Acciones",
    key: "actions",
    width: "w-24",
    align: "center",
    render: (_, user) => (
      <RowActions
        actions={[
          {
            key: "edit",
            label: "Editar datos",
            icon: "edit",
            hidden: !user.profileCompleted,
            onClick: () => handlers.onEdit(user),
          },
          {
            key: "roles",
            label: "Cambiar roles",
            icon: "roles",
            onClick: () => handlers.onChangeRoles(user),
          },
          {
            key: "delete",
            label: "Eliminar",
            icon: "delete",
            confirm: {
              title: `¿Eliminar a ${user.person?.fullName ?? user.email}?`,
              content: "El usuario ya no podrá acceder al sistema.",
              okText: "Eliminar",
            },
            onClick: () => handlers.onDelete(user),
          },
        ]}
      />
    ),
  },
];
