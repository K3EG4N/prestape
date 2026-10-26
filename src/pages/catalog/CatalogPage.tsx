import { App, Button, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { DataTable } from "@/components/table/DataTable";
import { CATALOG_TABS, MOCK_EQUIPMENT, MOCK_KITS } from "@/constants/catalog";
import { CATALOG_PATH } from "@/constants/routes";
import { getIcon } from "@/utils/getIcon";
import { kitColumns } from "./columns/kitColumns";
import { equipmentColumns } from "./columns/equipmentColumns";
import { CategoryPage } from "./category/CategoryPage";
import type { CatalogTab, ICatalogPageProps } from "@/interfaces/ICatalog";

export const CatalogPage = ({ tab }: ICatalogPageProps) => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const createLabel = CATALOG_TABS.find((t) => t.value === tab)?.createLabel;

  const createButton = (
    <Button
      type="primary"
      icon={getIcon("plus")}
      onClick={() => message.info("Próximamente")}
    >
      {createLabel}
    </Button>
  );

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
        return (
          <DataTable
            enableSearch
            searchPlaceholder="Buscar por código, nombre o serie..."
            data={MOCK_EQUIPMENT}
            columns={equipmentColumns}
            rowKey={(item) => item.id}
            leftActions={createButton}
          />
        );
      case "kits":
        return (
          <DataTable
            enableSearch
            searchPlaceholder="Buscar por código, nombre o serie..."
            data={MOCK_KITS}
            columns={kitColumns}
            rowKey={(kit) => kit.id}
            leftActions={createButton}
          />
        );
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
