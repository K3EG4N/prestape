import logo from "@/assets/prestape-logo.svg";
import { Divider, Flex } from "antd";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarSkeleton } from "./SiderbarSkeleton";
import { SidebarItem } from "./SiderbarItem";
import { getSection } from "@/utils/routes";

const SETTINGS_URL = "/settings";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { menuItems, loading } = useMenuItems();

  const isItemActive = (url: string) =>
    getSection(pathname) === getSection(url);

  return (
    <aside className="w-15 h-full flex justify-center items-center">
      <section className="border border-stone-200 rounded-xl p-2 w-full flex flex-col justify-start items-center bg-white shadow-sm">
        <img
          src={logo}
          draggable={false}
          alt="Logo"
          className="size-9.5 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <Divider size="small" className="border-stone-300!" />

        <Flex vertical gap={8} className="w-full">
          {loading ? (
            <SidebarSkeleton />
          ) : (
            menuItems.map((option) => (
              <SidebarItem
                key={option.url}
                title={option.name}
                icon={option.icon ?? ""}
                active={isItemActive(option.url)}
                onClick={() => navigate(option.url)}
              />
            ))
          )}
        </Flex>

        <Divider size="small" className="border-stone-300!" />
        <SidebarItem
          title="Configuración"
          icon="settings"
          active={isItemActive(SETTINGS_URL)}
          onClick={() => navigate(SETTINGS_URL)}
        />
      </section>
    </aside>
  );
};
