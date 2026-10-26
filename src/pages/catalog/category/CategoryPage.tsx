import { useState } from "react";
import { Button } from "antd";
import { DataTable } from "@/components/table/DataTable";
import { useCategories } from "@/hooks/category/useCategories";
import { useAuthContext } from "@/context/useAuthContext";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants/roles";
import { hasAnyRole } from "@/utils/auth";
import { getIcon } from "@/utils/getIcon";
import { getCategoryColumns } from "./columns/categoryColumns";
import { CreateCategoryModal } from "./modals/CreateCategoryModal";
import { EditCategoryModal } from "./modals/EditCategoryModal";
import { DeleteCategoryModal } from "./modals/DeleteCategoryModal";
import type { ICategory, ICategoryRowHandlers } from "@/interfaces/ICatalog";

export const CategoryPage = () => {
  const { profile } = useAuthContext();
  const { data, loading, reload, onChangeSearch } = useCategories();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(
    null,
  );
  const canManage = hasAnyRole(profile, [ADMIN_ROLE, SUPERVISOR_ROLE]);

  const handlers: ICategoryRowHandlers = {
    onEdit: setEditingCategory,
    onDelete: setDeletingCategory,
  };

  return (
    <>
      <DataTable
        enableSearch
        searchPlaceholder="Buscar categoría..."
        data={data.content}
        columns={getCategoryColumns(handlers, canManage)}
        rowKey={(c) => c.id}
        loading={loading}
        onSearchChange={(value) => onChangeSearch(value)}
        leftActions={
          <>
            {canManage && (
              <Button
                type="primary"
                icon={getIcon("plus")}
                onClick={() => setOpenCreateModal(true)}
              >
                Crear categoría
              </Button>
            )}
            <Button icon={getIcon("refresh")} onClick={reload}>
              Actualizar
            </Button>
          </>
        }
      />

      <CreateCategoryModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />

      <EditCategoryModal
        open={editingCategory !== null}
        category={editingCategory}
        onClose={() => setEditingCategory(null)}
        reload={reload}
      />

      <DeleteCategoryModal
        open={deletingCategory !== null}
        category={deletingCategory}
        onClose={() => setDeletingCategory(null)}
        reload={reload}
      />
    </>
  );
};
