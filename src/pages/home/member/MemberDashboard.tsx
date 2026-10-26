import { StatCard } from "@/components/dashboard/StatCard";
import { MOCK_MEMBER_STATS } from "@/constants/dashboard";
import { getIcon } from "@/utils/getIcon";
import { formatShortDate } from "@/utils/date";
import { MyActiveLoansCard } from "./MyActiveLoansCard";
import { MyRequestsCard } from "./MyRequestsCard";
import { AvailableByCategoryCard } from "./AvailableByCategoryCard";

export const MemberDashboard = () => {
  const stats = MOCK_MEMBER_STATS;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard
          label="Mis préstamos"
          icon={getIcon("kits")}
          value={stats.activeLoans}
          caption="activos"
        />
        <StatCard
          label="Próxima devolución"
          icon={getIcon("calendar")}
          value={`${stats.nextReturnInDays} días`}
          caption={formatShortDate(stats.nextReturnDate)}
        />
        <StatCard
          label="Solicitudes"
          icon={getIcon("clock")}
          value={stats.pendingRequests}
          caption="en revisión"
        />
        <StatCard
          label="Historial"
          icon={getIcon("history")}
          value={stats.historyCount}
          caption={`${stats.onTimeRate}% devueltos a tiempo`}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        <MyActiveLoansCard />
        <MyRequestsCard />
        <AvailableByCategoryCard />
      </div>
    </div>
  );
};
