import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { CATALOG_TABS } from "@/constants/catalog";
import { CATALOG_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";
import { CategoryPage } from "./category/CategoryPage";
import { EquipmentPage } from "./equipment/EquipmentPage";
import { KitPage } from "./kit/KitPage";
import type { CatalogTab, ICatalogPageProps } from "@/interfaces/ICatalog";

export const CatalogPage = ({ tab }: ICatalogPageProps) => {
  const navigate = useNavigate();

  const tabs = (
    <Tabs
      activeKey={tab}
      size="small"
      onChange={(key) => navigate(`${CATALOG_PATH}/${key as CatalogTab}`)}
      items={CATALOG_TABS.map(({ label, value, icon }) => ({
        key: value,
        label,
        icon: getIcon(icon),
      }))}
      tabBarStyle={{ marginBottom: 0 }}
    />
  );

  const renderTable = () => {
    switch (tab) {
      case "equipment":
        return <EquipmentPage />;
      case "kits":
        return <KitPage />;
      case "categories":
        return <CategoryPage />;
    }
  };

  return (
    <section className="flex h-full min-h-0 flex-col gap-4">
      <div>
        <AppBreadcrumb />
        <PageHeader
          title="Catálogo"
          text="Consulta los equipos, kits y categorías disponibles."
        />
      </div>

      {tabs}
      {renderTable()}
    </section>
  );
};
