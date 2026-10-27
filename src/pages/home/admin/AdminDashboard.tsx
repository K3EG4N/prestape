import { Button, Empty } from "antd";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CompactTable } from "@/components/dashboard/CompactTable";
import { FEATURES } from "@/constants/features";
import { DASHBOARD_COLORS } from "@/constants/dashboard";
import { CATALOG_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";
import { AdminDashboardSkeleton } from "./AdminDashboardSkeleton";
import { InventoryStatusCard } from "./InventoryStatusCard";
import { UsersSummaryCard } from "./UsersSummaryCard";
import { LoanTrendChart } from "./LoanTrendChart";
import { TopEquipmentCard } from "./TopEquipmentCard";
import { DueReturnsTodayCard } from "./DueReturnsTodayCard";
import { attentionColumns, categoryStockColumns } from "./columns/adminColumns";
import type { IAdminDashboardProps } from "@/interfaces/IDashboard";

const percent = (value: number, total: number) =>
  total ? Math.round((value / total) * 100) : 0;

export const AdminDashboard = ({
  data,
  loading,
  failed,
  reload,
}: IAdminDashboardProps) => {
  if (loading || (!data && !failed)) return <AdminDashboardSkeleton />;

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No se pudo cargar el resumen"
        >
          <Button icon={getIcon("refresh")} onClick={reload}>
            Reintentar
          </Button>
        </Empty>
      </div>
    );
  }

  const { equipment, kits, categories, users, attention, trends } = data;
  const available = equipment.byAvailability.AVAILABLE;

  return (
    <div className="flex flex-col gap-3 lg:h-full lg:min-h-0">
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Equipos registrados"
          icon={getIcon("equipment")}
          value={equipment.total}
          trend={trends.equipment}
          caption={
            trends.equipment != null
              ? "vs mes anterior"
              : `En ${categories.length} categorías`
          }
        />
        <StatCard
          label="Equipos disponibles"
          icon={getIcon("check")}
          value={
            <>
              {available}
              <span className="text-sm font-normal text-stone-400">
                {" "}
                / {equipment.total}
              </span>
            </>
          }
          caption={`${percent(available, equipment.total)}% del inventario`}
        />
        <StatCard
          label="En mantenimiento"
          icon={getIcon("warning")}
          value={equipment.byAvailability.IN_MAINTENANCE}
          caption={`${equipment.byAvailability.RETIRED} de baja`}
        />
        <StatCard
          label="Kits disponibles"
          icon={getIcon("kits")}
          value={
            <>
              {kits.available}
              <span className="text-sm font-normal text-stone-400">
                {" "}
                / {kits.total}
              </span>
            </>
          }
          trend={trends.kits}
          caption={
            trends.kits != null ? "kits vs mes anterior" : "Listos para prestar"
          }
        />
        <StatCard
          label="Usuarios registrados"
          icon={getIcon("users")}
          value={users.total}
          trend={trends.users}
          caption={
            trends.users != null
              ? "vs mes anterior"
              : `${users.newThisMonth} nuevos este mes`
          }
        />
      </div>

      <div className="grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-6 lg:grid-rows-2">
        <DashboardCard
          title="Equipos por categoría"
          linkTo={CATALOG_PATH}
          linkLabel="Ver catálogo"
          className="lg:col-span-4"
          bodyClassName="overflow-y-auto"
        >
          <CompactTable
            data={categories}
            columns={categoryStockColumns}
            rowKey={(category) => category.id}
          />
        </DashboardCard>

        <div className="flex flex-col gap-3 lg:col-span-2 lg:row-span-2 lg:min-h-0">
          <InventoryStatusCard equipment={equipment} categories={categories} />
          <UsersSummaryCard users={users} />
        </div>

        <DashboardCard
          title="Requieren atención"
          className="lg:col-span-4"
          bodyClassName="overflow-y-auto"
          footer={
            <>
              <span style={{ color: DASHBOARD_COLORS.primary }}>
                {getIcon("warning")}
              </span>
              Equipos dañados o en mantenimiento
            </>
          }
        >
          {attention.length > 0 ? (
            <CompactTable
              data={attention}
              columns={attentionColumns}
              rowKey={(item) => item.id}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Todos los equipos están en buen estado"
              />
            </div>
          )}
        </DashboardCard>

        {FEATURES.loans && (
          <>
            <LoanTrendChart />
            <TopEquipmentCard />
            <DueReturnsTodayCard />
          </>
        )}
      </div>
    </div>
  );
};
