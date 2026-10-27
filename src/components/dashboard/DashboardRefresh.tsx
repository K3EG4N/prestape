import { useEffect, useState } from "react";
import { Button } from "antd";
import { getIcon } from "@/utils/getIcon";
import { formatRelative } from "@/utils/date";
import type { IDashboardRefreshProps } from "@/interfaces/IDashboard";

const TICK_MS = 30_000;
const RECENT_MS = 60_000;

const formatUpdatedAt = (updatedAt: Date) =>
  Date.now() - updatedAt.getTime() < RECENT_MS
    ? "hace un momento"
    : formatRelative(updatedAt);

export const DashboardRefresh = ({
  updatedAt,
  loading,
  onRefresh,
}: IDashboardRefreshProps) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((tick) => tick + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex shrink-0 items-center gap-3">
      <Button icon={getIcon("refresh")} loading={loading} onClick={onRefresh}>
        Actualizar
      </Button>
      {updatedAt && !loading && (
        <span className="text-xs text-stone-400">
          Actualizado {formatUpdatedAt(updatedAt)}
        </span>
      )}
    </div>
  );
};
