import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CompactTable } from "@/components/dashboard/CompactTable";
import {
  DASHBOARD_COLORS,
  LAB_CLOSING_TIME,
  MOCK_DUE_RETURNS_TODAY,
} from "@/constants/dashboard";
import { LOANS_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";
import { dueReturnColumns } from "./columns/adminColumns";

export const DueReturnsTodayCard = () => {
  const total = MOCK_DUE_RETURNS_TODAY.length;
  const pending = MOCK_DUE_RETURNS_TODAY.filter((r) => !r.returned);

  return (
    <DashboardCard
      title="Devoluciones de hoy"
      linkTo={LOANS_PATH}
      className="lg:col-span-3"
      footer={
        <>
          <span style={{ color: DASHBOARD_COLORS.primary }}>
            {getIcon("clock")}
          </span>
          El laboratorio cierra a las {LAB_CLOSING_TIME}
        </>
      }
      footerExtra={
        <>
          <span className="font-semibold text-stone-800">
            {total - pending.length}
          </span>{" "}
          de {total} devueltas
        </>
      }
    >
      <CompactTable
        data={pending}
        columns={dueReturnColumns}
        rowKey={(item) => item.id}
      />
    </DashboardCard>
  );
};
