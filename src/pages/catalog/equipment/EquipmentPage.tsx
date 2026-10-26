import { useState } from "react";
import { Button } from "antd";
import { DataTable } from "@/components/table/DataTable";
import { FilterDropdown } from "@/components/table/filters/FilterDropdown";
import { useEquipments } from "@/hooks/equipment/useEquipments";
import { useCategoryOptions } from "@/hooks/category/useCategoryOptions";
import { useAuthContext } from "@/context/useAuthContext";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants/roles";
import {
  EQUIPMENT_AVAILABILITY_OPTIONS,
  EQUIPMENT_CONDITION_OPTIONS,
} from "@/constants/equipment";
import { hasAnyRole } from "@/utils/auth";
import { getIcon } from "@/utils/getIcon";
import { getEquipmentColumns } from "./columns/equipmentColumns";
import { CreateEquipmentModal } from "./modals/CreateEquipmentModal";
import { EditEquipmentModal } from "./modals/EditEquipmentModal";
import { DeleteEquipmentModal } from "./modals/DeleteEquipmentModal";
import type {
  IEquipment,
  IEquipmentRowHandlers,
} from "@/interfaces/IEquipment";

export const EquipmentPage = () => {
  const { profile } = useAuthContext();
  const { data, pagination, filters, loading, changeFilter, reload } =
    useEquipments();
  const { categories } = useCategoryOptions();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<IEquipment | null>(
    null,
  );
  const [deletingEquipment, setDeletingEquipment] = useState<IEquipment | null>(
    null,
  );
  const canManage = hasAnyRole(profile, [ADMIN_ROLE, SUPERVISOR_ROLE]);

  const handlers: IEquipmentRowHandlers = {
    onEdit: setEditingEquipment,
    onDelete: setDeletingEquipment,
  };

  return (
    <>
      <DataTable
        enableSearch
        searchPlaceholder="Buscar por nombre, código o serie..."
        data={data.content}
        columns={getEquipmentColumns(handlers, canManage)}
        rowKey={(e) => e.id}
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
                Crear equipo
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
                key: "categoryIds",
                label: "Categoría",
                description: "Filtra por una o más categorías",
                icon: getIcon("categories"),
                options: categories.map((c) => ({
                  value: String(c.id),
                  label: c.name,
                })),
                value: filters.categoryIds,
                onChange: (value) => changeFilter("categoryIds", value),
              },
              {
                type: "options",
                key: "availabilities",
                label: "Disponibilidad",
                description: "Filtra por la disponibilidad del equipo",
                icon: getIcon("check"),
                options: EQUIPMENT_AVAILABILITY_OPTIONS,
                value: filters.availabilities,
                onChange: (value) => changeFilter("availabilities", value),
              },
              {
                type: "options",
                key: "conditions",
                label: "Condición",
                description: "Filtra por el estado físico del equipo",
                icon: getIcon("warning"),
                options: EQUIPMENT_CONDITION_OPTIONS,
                value: filters.conditions,
                onChange: (value) => changeFilter("conditions", value),
              },
            ]}
          />
        }
      />

      <CreateEquipmentModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        reload={reload}
      />

      <EditEquipmentModal
        open={editingEquipment !== null}
        equipment={editingEquipment}
        onClose={() => setEditingEquipment(null)}
        reload={reload}
      />

      <DeleteEquipmentModal
        open={deletingEquipment !== null}
        equipment={deletingEquipment}
        onClose={() => setDeletingEquipment(null)}
        reload={reload}
      />
    </>
  );
};
