import { Tag } from "antd";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { MOCK_MY_REQUESTS, REQUEST_STATUS_TAG } from "@/constants/dashboard";
import { LOANS_PATH } from "@/constants/routes";
import { formatRelative } from "@/utils/date";

export const MyRequestsCard = () => {
  return (
    <DashboardCard title="Mis solicitudes" linkTo={LOANS_PATH}>
      <ul className="h-full divide-y divide-stone-100 overflow-y-auto">
        {MOCK_MY_REQUESTS.map((request) => {
          const status = REQUEST_STATUS_TAG[request.status];

          return (
            <li
              key={request.id}
              className="flex items-center justify-between gap-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium text-stone-800">
                  {request.item}
                </div>
                <div className="text-xs text-stone-500">
                  {formatRelative(request.requestedAt)}
                </div>
              </div>
              <Tag bordered={false} color={status.color} className="shrink-0">
                {status.label}
              </Tag>
            </li>
          );
        })}
      </ul>
    </DashboardCard>
  );
};
