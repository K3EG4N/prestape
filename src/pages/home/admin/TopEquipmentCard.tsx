import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CompactTable } from "@/components/dashboard/CompactTable";
import {
  DASHBOARD_COLORS,
  MOCK_LOANS_IN_PERIOD,
  MOCK_TOP_EQUIPMENT,
  TOP_EQUIPMENT_PERIOD,
} from "@/constants/dashboard";
import { getIcon } from "@/utils/getIcon";
import { topEquipmentColumns } from "./columns/adminColumns";

export const TopEquipmentCard = () => {
  return (
    <DashboardCard
      title="Equipos más prestados"
      className="lg:col-span-3"
      footer={
        <>
          <span style={{ color: DASHBOARD_COLORS.primary }}>
            {getIcon("calendar")}
          </span>
          {TOP_EQUIPMENT_PERIOD}
        </>
      }
      footerExtra={
        <>
          <span className="font-semibold text-stone-800">
            {MOCK_LOANS_IN_PERIOD}
          </span>{" "}
          préstamos en total
        </>
      }
    >
      <CompactTable
        data={MOCK_TOP_EQUIPMENT}
        columns={topEquipmentColumns}
        rowKey={(equipment) => equipment.id}
      />
    </DashboardCard>
  );
};
