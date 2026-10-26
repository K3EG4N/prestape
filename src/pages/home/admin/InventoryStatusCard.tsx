import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { BreakdownBar } from "@/components/dashboard/BreakdownBar";
import {
  DASHBOARD_COLORS,
  INVENTORY_SEGMENT_COLORS,
} from "@/constants/dashboard";
import {
  EQUIPMENT_AVAILABILITY_DISPLAY,
  EQUIPMENT_CONDITION_DISPLAY,
} from "@/constants/equipment";
import { CATALOG_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";
import type { IInventoryStatusCardProps } from "@/interfaces/IDashboard";
import type {
  EquipmentAvailability,
  EquipmentCondition,
} from "@/interfaces/IEquipment";

export const InventoryStatusCard = ({
  equipment,
  categories,
}: IInventoryStatusCardProps) => {
  const segments = (
    Object.keys(EQUIPMENT_AVAILABILITY_DISPLAY) as EquipmentAvailability[]
  ).map((availability) => ({
    key: availability,
    label: EQUIPMENT_AVAILABILITY_DISPLAY[availability].label,
    value: equipment.byAvailability[availability],
    color: INVENTORY_SEGMENT_COLORS[availability],
  }));

  const conditions = (
    Object.keys(EQUIPMENT_CONDITION_DISPLAY) as EquipmentCondition[]
  )
    .map(
      (condition) =>
        `${equipment.byCondition[condition]} ${EQUIPMENT_CONDITION_DISPLAY[condition].label.toLowerCase()}`,
    )
    .join(" · ");

  const lowestStock = categories
    .filter((category) => category.total > 0)
    .reduce<(typeof categories)[number] | null>(
      (lowest, category) =>
        !lowest || category.available < lowest.available ? category : lowest,
      null,
    );

  return (
    <DashboardCard
      title="Estado del inventario"
      linkTo={CATALOG_PATH}
      linkLabel="Ver catálogo"
      bodyClassName="flex flex-col gap-3"
      footer={
        lowestStock && (
          <>
            <span style={{ color: DASHBOARD_COLORS.primary }}>
              {getIcon("warning")}
            </span>
            Menor stock:{" "}
            <span className="text-stone-600">{lowestStock.name}</span>(
            {lowestStock.available}{" "}
            {lowestStock.available === 1 ? "disponible" : "disponibles"})
          </>
        )
      }
    >
      <div className="text-[13px] text-stone-500">
        <span className="text-xl font-semibold text-stone-800">
          {equipment.total}
        </span>{" "}
        equipos registrados
      </div>
      <BreakdownBar segments={segments} />
      <div className="text-xs text-stone-400">{conditions}</div>
    </DashboardCard>
  );
};
