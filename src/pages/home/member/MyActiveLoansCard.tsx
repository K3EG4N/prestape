import { Progress, Tag } from "antd";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import {
  DASHBOARD_COLORS,
  LOAN_WARNING_DAYS,
  MOCK_MY_LOANS,
} from "@/constants/dashboard";
import { LOANS_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";
import { daysUntil, formatShortDate } from "@/utils/date";
import type { IMyLoan } from "@/interfaces/IDashboard";

const getLoanState = (loan: IMyLoan) => {
  const remaining = daysUntil(loan.dueAt);
  const start = new Date(loan.borrowedAt).getTime();
  const end = new Date(loan.dueAt).getTime();
  const elapsed = Math.round(((Date.now() - start) / (end - start)) * 100);
  const percent = Math.min(Math.max(elapsed, 0), 100);

  if (remaining < 0) {
    return { percent, color: DASHBOARD_COLORS.danger, tag: "red", label: "Vencido" };
  }
  if (remaining <= LOAN_WARNING_DAYS) {
    const label = remaining === 0 ? "Vence hoy" : `Vence en ${remaining} ${remaining === 1 ? "día" : "días"}`;
    return { percent, color: DASHBOARD_COLORS.warning, tag: "gold", label };
  }
  return { percent, color: DASHBOARD_COLORS.success, tag: "green", label: "En plazo" };
};

export const MyActiveLoansCard = () => {
  return (
    <DashboardCard
      title="Mis préstamos activos"
      linkTo={LOANS_PATH}
      linkLabel="Ver historial"
      className="lg:col-span-3"
    >
      <ul className="h-full divide-y divide-stone-100 overflow-y-auto">
        {MOCK_MY_LOANS.map((loan) => {
          const state = getLoanState(loan);

          return (
            <li key={loan.id} className="flex items-center gap-3 py-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                {getIcon("equipment")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium text-stone-800">
                      {loan.name}
                    </div>
                    <div className="text-xs text-stone-500">
                      {loan.code} · devolver el {formatShortDate(loan.dueAt)}
                    </div>
                  </div>
                  <Tag bordered={false} color={state.tag} className="shrink-0">
                    {state.label}
                  </Tag>
                </div>
                <Progress
                  percent={state.percent}
                  showInfo={false}
                  size="small"
                  strokeColor={state.color}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </DashboardCard>
  );
};
