import { Avatar } from "antd";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DASHBOARD_COLORS, RECENT_USERS_VISIBLE } from "@/constants/dashboard";
import { USERS_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";
import { capitalize, getInitials } from "@/utils/string";
import { getUserStatusDisplay } from "@/utils/user";
import { formatRelative } from "@/utils/date";
import type { IUsersSummaryCardProps } from "@/interfaces/IDashboard";

const AVATAR_STYLE = {
  color: DASHBOARD_COLORS.primary,
  backgroundColor: DASHBOARD_COLORS.primaryBg,
  fontSize: 11,
};

export const UsersSummaryCard = ({ users }: IUsersSummaryCardProps) => {
  const { total, active, incomplete, suspended, recentUsers } = users;

  return (
    <DashboardCard
      title="Usuarios"
      linkTo={USERS_PATH}
      linkLabel="Ver usuarios"
      className="lg:flex-1"
      bodyClassName="flex flex-col gap-3 overflow-y-auto"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[13px] text-stone-500">
            <span className="text-xl font-semibold text-stone-800">
              {total}
            </span>{" "}
            registrados
          </div>
        </div>
        <div className="flex gap-5">
          {[
            { label: "Activos", value: active },
            { label: "Incompletos", value: incomplete },
            { label: "Suspendidos", value: suspended },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <div className="text-base font-semibold text-stone-800 tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-stone-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1 text-xs text-stone-400">Últimos registros</div>
        <ul className="divide-y divide-stone-100">
          {recentUsers.slice(0, RECENT_USERS_VISIBLE).map((user) => {
            const status = getUserStatusDisplay(user);
            const displayName = user.name ?? user.email;

            return (
              <li key={user.id} className="flex items-center gap-3 py-1.5">
                <Avatar
                  size={28}
                  shape="square"
                  style={AVATAR_STYLE}
                  className="shrink-0"
                >
                  {getInitials(displayName)}
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] text-stone-800">
                    {displayName}
                  </div>
                  <div className="flex items-center gap-1.5 truncate text-xs text-stone-400">
                    {user.role && <span>{capitalize(user.role)}</span>}
                    {user.role && <span>·</span>}
                    <span
                      className={`flex items-center gap-1 ${status.className}`}
                    >
                      {getIcon(status.icon)}
                      {status.label}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-stone-400">
                  {formatRelative(user.createdAt)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </DashboardCard>
  );
};
