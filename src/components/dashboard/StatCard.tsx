import { Card } from "antd";
import type { IStatCardProps } from "@/interfaces/IDashboard";

export const StatCard = ({
  label,
  value,
  icon,
  caption,
  trend,
}: IStatCardProps) => {
  return (
    <Card size="small" styles={{ body: { padding: "12px 16px" } }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-[13px] text-stone-500">{label}</div>
          <div className="mt-0.5 text-2xl leading-tight font-bold text-stone-900">
            {value}
          </div>
          {(caption || trend !== undefined) && (
            <div className="mt-0.5 truncate text-xs text-stone-400">
              {trend !== undefined && (
                <span
                  className={`mr-1 font-medium ${trend >= 0 ? "text-green-600" : "text-red-500"}`}
                >
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </span>
              )}
              {caption}
            </div>
          )}
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-base text-blue-600">
          {icon}
        </span>
      </div>
    </Card>
  );
};
