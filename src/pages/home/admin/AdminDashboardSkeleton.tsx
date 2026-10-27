import { Skeleton } from "antd";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { getIcon } from "@/utils/getIcon";
import {
  DASHBOARD_COLORS,
  RECENT_USERS_VISIBLE,
} from "@/constants/dashboard";

const STAT_CARDS = [
  { label: "Equipos registrados", icon: "equipment" },
  { label: "Equipos disponibles", icon: "check" },
  { label: "En mantenimiento", icon: "warning" },
  { label: "Kits disponibles", icon: "kits" },
  { label: "Usuarios registrados", icon: "users" },
] as const;

const LINE_HEIGHT = {
  statValue: 30,
  caption: 16,
  total: 28,
  legend: 20.4,
  row: 20,
};

const Line = ({
  width,
  height,
  bar = Math.round(height * 0.6),
}: {
  width: number | string;
  height: number;
  bar?: number;
}) => (
  <div className="flex items-center" style={{ height, width }}>
    <Skeleton.Input
      active
      block
      size="small"
      style={{ minWidth: 0, height: bar }}
    />
  </div>
);

const TableRows = ({ rows }: { rows: number }) => (
  <div className="flex flex-col">
    <div className="border-b border-stone-100 pb-2">
      <Line width="60%" height={16} bar={10} />
    </div>
    {Array.from({ length: rows }, (_, index) => (
      <div key={index} className="border-b border-stone-100 py-2 last:border-b-0">
        <Line width="100%" height={LINE_HEIGHT.row} />
      </div>
    ))}
  </div>
);

export const AdminDashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 lg:h-full lg:min-h-0">
      <div className="grid shrink-0 grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            icon={getIcon(card.icon)}
            value={<Line width={56} height={LINE_HEIGHT.statValue} bar={22} />}
            caption={<Line width={110} height={LINE_HEIGHT.caption} bar={10} />}
          />
        ))}
      </div>

      <div className="grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-6 lg:grid-rows-2">
        <DashboardCard title="Equipos por categoría" className="lg:col-span-4">
          <TableRows rows={4} />
        </DashboardCard>

        <div className="flex flex-col gap-3 lg:col-span-2 lg:row-span-2 lg:min-h-0">
          <DashboardCard
            title="Estado del inventario"
            bodyClassName="flex flex-col gap-3"
            footer={<Line width={180} height={LINE_HEIGHT.caption} bar={10} />}
          >
            <Line width={140} height={LINE_HEIGHT.total} bar={20} />
            <div className="mb-3 flex flex-col gap-3">
              <Line width="100%" height={12} bar={12} />
              <div className="flex flex-col gap-1.5">
                {Array.from({ length: 4 }, (_, index) => (
                  <Line key={index} width="100%" height={LINE_HEIGHT.legend} />
                ))}
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Usuarios"
            className="lg:flex-1"
            bodyClassName="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <Line width={130} height={LINE_HEIGHT.total} bar={20} />
                <Line width={80} height={LINE_HEIGHT.caption} bar={10} />
              </div>
              <div className="flex gap-5">
                {Array.from({ length: 3 }, (_, index) => (
                  <div key={index}>
                    <Line width={56} height={24} bar={16} />
                    <Line width={56} height={LINE_HEIGHT.caption} bar={10} />
                  </div>
                ))}
              </div>
            </div>
            {Array.from({ length: RECENT_USERS_VISIBLE }, (_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton.Avatar active shape="square" size={28} />
                <div className="flex flex-1 flex-col gap-1">
                  <Line width="70%" height={16} bar={12} />
                  <Line width="45%" height={14} bar={10} />
                </div>
              </div>
            ))}
          </DashboardCard>
        </div>

        <DashboardCard
          title="Requieren atención"
          className="lg:col-span-4"
          footer={
            <>
              <span style={{ color: DASHBOARD_COLORS.primary }}>
                {getIcon("warning")}
              </span>
              Equipos dañados o en mantenimiento
            </>
          }
        >
          <TableRows rows={3} />
        </DashboardCard>
      </div>
    </div>
  );
};
