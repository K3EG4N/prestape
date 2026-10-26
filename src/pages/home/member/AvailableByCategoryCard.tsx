import { App, Button } from "antd";
import { Link } from "react-router-dom";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { MOCK_CATEGORY_AVAILABILITY } from "@/constants/dashboard";
import { CATALOG_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";

export const AvailableByCategoryCard = () => {
  const { message } = App.useApp();

  return (
    <DashboardCard
      title="Disponible ahora por categoría"
      className="lg:col-span-4"
      extra={
        <div className="flex items-center gap-4">
          <Link to={CATALOG_PATH}>Ir al catálogo</Link>
          <Button
            type="primary"
            size="small"
            icon={getIcon("plus")}
            onClick={() => message.info("Próximamente")}
          >
            Solicitar préstamo
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {MOCK_CATEGORY_AVAILABILITY.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-3 rounded-lg bg-stone-50 px-3 py-2.5"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-white text-stone-600">
              {getIcon(category.icon)}
            </span>
            <div>
              <div className="text-xs text-stone-500">{category.name}</div>
              <div className="text-base font-semibold text-stone-800">
                {category.available}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
