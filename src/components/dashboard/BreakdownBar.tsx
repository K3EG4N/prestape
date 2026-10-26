import { Tooltip } from "antd";
import type { IBreakdownBarProps } from "@/interfaces/IDashboard";

export const BreakdownBar = ({ segments }: IBreakdownBarProps) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const percent = (value: number) =>
    total ? Math.round((value / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-3 gap-0.5 overflow-hidden rounded-full">
        {segments.map((segment) => (
          <Tooltip
            key={segment.key}
            title={`${segment.label}: ${segment.value}`}
          >
            <div
              className="h-full"
              style={{
                width: `${percent(segment.value)}%`,
                minWidth: segment.value ? 4 : 0,
                backgroundColor: segment.color,
              }}
            />
          </Tooltip>
        ))}
      </div>

      <ul className="flex flex-col gap-1.5">
        {segments.map((segment) => (
          <li
            key={segment.key}
            className="flex items-center justify-between text-[13px]"
          >
            <span className="flex items-center gap-2 text-stone-600">
              <span
                className="size-2.5 rounded-sm"
                style={{ backgroundColor: segment.color }}
              />
              {segment.label}
            </span>
            <span className="tabular-nums">
              <span className="font-medium text-stone-800">
                {segment.value}
              </span>
              <span className="ml-2 inline-block w-9 text-right text-stone-400">
                {percent(segment.value)}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
