import { useState } from "react";
import { Button } from "antd";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/table/DataTable";
import { FilterDropdown } from "@/components/table/filters/FilterDropdown";
import { useLoans } from "@/hooks/loan/useLoans";
import { useExportExcel } from "@/hooks/useExportExcel";
import { useAuthContext } from "@/context/useAuthContext";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants/roles";
import { LOAN_STATUS_FILTER_OPTIONS } from "@/constants/loan";
import { LoanService } from "@/services/LoanService";
import { hasAnyRole } from "@/utils/auth";
import { buildLoanFilterParams } from "@/utils/loan";
import { getIcon } from "@/utils/getIcon";
import { getLoanColumns } from "./columns/loanColumns";
import { LoanDetailModal } from "./modals/LoanDetailModal";
import { CreateLoanModal } from "./modals/CreateLoanModal";
import { CancelLoanModal } from "./modals/CancelLoanModal";
import { RegisterPickupModal } from "./modals/RegisterPickupModal";
import { RegisterReturnModal } from "./modals/RegisterReturnModal";
import type { ILoan, ILoanRowHandlers } from "@/interfaces/ILoan";

export const LoansPage = () => {
  const { profile } = useAuthContext();
  const { data, pagination, filters, loading, changeFilter, reload } =
    useLoans();
  const { exportExcel, loading: exporting } = useExportExcel(
    LoanService.exportExcel,
    "prestamos.xlsx",
  );
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [viewingLoan, setViewingLoan] = useState<ILoan | null>(null);
  const [cancellingLoan, setCancellingLoan] = useState<ILoan | null>(null);
  const [pickingUpLoan, setPickingUpLoan] = useState<ILoan | null>(null);
  const [returningLoan, setReturningLoan] = useState<ILoan | null>(null);
  const canManage = hasAnyRole(profile, [ADMIN_ROLE, SUPERVISOR_ROLE]);

  const handlers: ILoanRowHandlers = {
    onView: setViewingLoan,
    onRegisterPickup: setPickingUpLoan,
    onRegisterReturn: setReturningLoan,
    onCancel: setCancellingLoan,
  };

  return (
    <section className="flex h-full min-h-0 flex-col gap-4">
      <div>
        <AppBreadcrumb />
        <PageHeader
          title="Préstamos"
          text="Registra préstamos y programa el recojo de los equipos."
        />
      </div>

      <DataTable
        enableSearch
        searchPlaceholder="Buscar por código o solicitante..."
        data={data.content}
        columns={getLoanColumns(handlers, canManage)}
        rowKey={(loan) => loan.id}
        columnSettingsKey="loans"
        loading={loading}
        onSearchChange={(value) => changeFilter("search", value)}
        pagination={{ ...pagination, total: data.totalElements }}
        leftActions={
          <>
            <Button
              type="primary"
              icon={getIcon("plus")}
              onClick={() => setOpenCreateModal(true)}
            >
              Crear préstamo
            </Button>
            <Button icon={getIcon("refresh")} onClick={reload}>
              Actualizar
            </Button>
            {canManage && (
              <Button
                icon={getIcon("download")}
                loading={exporting}
                onClick={() => exportExcel(buildLoanFilterParams(filters))}
              >
                Exportar
              </Button>
            )}
          </>
        }
        rightActions={
          <FilterDropdown
            items={[
              {
                type: "options",
                key: "statuses",
                label: "Estado",
                description: "Filtra por el estado del préstamo",
                icon: getIcon("check"),
                options: LOAN_STATUS_FILTER_OPTIONS,
                value: filters.statuses,
                onChange: (value) => changeFilter("statuses", value),
              },
              {
                type: "dateRange",
                key: "scheduledPickupAt",
                label: "Fecha de recojo",
                description: "Recojos programados entre estas fechas",
                icon: getIcon("calendar"),
                value: filters.scheduledPickupAt,
                onChange: (value) => changeFilter("scheduledPickupAt", value),
              },
              {
                type: "dateRange",
                key: "scheduledReturnAt",
                label: "Fecha de devolución",
                description: "Devoluciones programadas entre estas fechas",
                icon: getIcon("history"),
                value: filters.scheduledReturnAt,
                onChange: (value) => changeFilter("scheduledReturnAt", value),
              },
            ]}
          />
        }
      />

      <CreateLoanModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        reload={reload}
      />

      <LoanDetailModal
        open={viewingLoan !== null}
        loan={viewingLoan}
        onClose={() => setViewingLoan(null)}
      />

      <RegisterPickupModal
        open={pickingUpLoan !== null}
        loan={pickingUpLoan}
        onClose={() => setPickingUpLoan(null)}
        reload={reload}
      />

      <RegisterReturnModal
        open={returningLoan !== null}
        loan={returningLoan}
        onClose={() => setReturningLoan(null)}
        reload={reload}
      />

      <CancelLoanModal
        open={cancellingLoan !== null}
        loan={cancellingLoan}
        onClose={() => setCancellingLoan(null)}
        reload={reload}
      />
    </section>
  );
};
