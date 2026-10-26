import { useState } from "react";
import { Button } from "antd";
import { DataTable } from "@/components/table/DataTable";
import { FilterDropdown } from "@/components/table/filters/FilterDropdown";
import { useKits } from "@/hooks/kit/useKits";
import { useAuthContext } from "@/context/useAuthContext";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants/roles";
import { KIT_AVAILABILITY_OPTIONS } from "@/constants/kit";
import { hasAnyRole } from "@/utils/auth";
import { getIcon } from "@/utils/getIcon";
import { getKitColumns } from "./columns/kitColumns";
import { CreateKitModal } from "./modals/CreateKitModal";
import { EditKitModal } from "./modals/EditKitModal";
import { DeleteKitModal } from "./modals/DeleteKitModal";
import type { IKit, IKitRowHandlers } from "@/interfaces/IKit";

export const KitPage = () => {
  const { profile } = useAuthContext();
  const { data, pagination, filters, loading, changeFilter, reload } =
    useKits();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingKit, setEditingKit] = useState<IKit | null>(null);
  const [deletingKit, setDeletingKit] = useState<IKit | null>(null);
  const canManage = hasAnyRole(profile, [ADMIN_ROLE, SUPERVISOR_ROLE]);

  const handlers: IKitRowHandlers = {
    onEdit: setEditingKit,
    onDelete: setDeletingKit,
  };

  return (
    <>
      <DataTable
        enableSearch
        searchPlaceholder="Buscar por nombre o código..."
        data={data.content}
        columns={getKitColumns(handlers, canManage)}
        rowKey={(k) => k.id}
        loading={loading}
        onSearchChange={(value) => changeFilter("search", value)}
        pagination={{ ...pagination, total: data.totalElements }}
        leftActions={
          <>
            {canManage && (
              <Button
                type="primary"
                icon={getIcon("plus")}
                onClick={() => setOpenCreateModal(true)}
              >
                Crear kit
              </Button>
            )}
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
                key: "availabilities",
                label: "Disponibilidad",
                description: "Filtra según si el kit se puede prestar",
                icon: getIcon("check"),
                options: KIT_AVAILABILITY_OPTIONS,
                value: filters.availabilities,
                onChange: (value) => changeFilter("availabilities", value),
              },
            ]}
          />
        }
      />

      <CreateKitModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        reload={reload}
      />

      <EditKitModal
        open={editingKit !== null}
        kit={editingKit}
        onClose={() => setEditingKit(null)}
        reload={reload}
      />

      <DeleteKitModal
        open={deletingKit !== null}
        kit={deletingKit}
        onClose={() => setDeletingKit(null)}
        reload={reload}
      />
    </>
  );
};
