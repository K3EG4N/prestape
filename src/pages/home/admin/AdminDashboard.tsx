import { Button, Empty, Spin } from "antd";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CompactTable } from "@/components/dashboard/CompactTable";
import { useAdminDashboard } from "@/hooks/dashboard/useAdminDashboard";
import { FEATURES } from "@/constants/features";
import { CATALOG_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";
import { InventoryStatusCard } from "./InventoryStatusCard";
import { UsersSummaryCard } from "./UsersSummaryCard";
import { LoanTrendChart } from "./LoanTrendChart";
import { TopEquipmentCard } from "./TopEquipmentCard";
import { DueReturnsTodayCard } from "./DueReturnsTodayCard";
import { attentionColumns, categoryStockColumns } from "./columns/adminColumns";

const percent = (value: number, total: number) =>
  total ? Math.round((value / total) * 100) : 0;

export const AdminDashboard = () => {
  const { data, loading, reload } = useAdminDashboard();

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        {loading ? (
          <Spin />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No se pudo cargar el resumen"
          >
            <Button icon={getIcon("refresh")} onClick={reload}>
              Reintentar
            </Button>
          </Empty>
        )}
      </div>
    );
  }

  const { equipment, kits, categories, users, attention } = data;
  const available = equipment.byAvailability.AVAILABLE;

  return (
    <div className="flex flex-col gap-3 lg:h-full lg:min-h-0">
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Equipos registrados"
          icon={getIcon("equipment")}
          value={equipment.total}
          caption={`En ${categories.length} categorías`}
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
          caption="Listos para prestar"
        />
        <StatCard
          label="Usuarios activos"
          icon={getIcon("users")}
          value={users.active}
          caption={`${users.newThisMonth} nuevos este mes`}
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
              {getIcon("warning")}
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
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Todos los equipos están en buen estado"
            />
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
