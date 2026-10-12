import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ThemeSwitch } from "./ThemeSwitch";
import { useAuthContext } from "@/context/useAuthContext";
import { capitalize, getInitials } from "@/utils/string";
import { getIcon } from "@/utils/getIcon";
import type { MenuProps } from "antd";

const MenuLabel = ({ text }: { text: string }) => (
  <div className="flex items-center justify-between gap-8">
    <span>{text}</span>
  </div>
);

export const Topbar = () => {
  const { profile, signOut } = useAuthContext();

  const items: MenuProps["items"] = [
    {
      key: "account",
      icon: getIcon("user"),
      label: <MenuLabel text="Mi cuenta" />,
    },
    {
      key: "profile",
      icon: getIcon("idcard"),
      label: <MenuLabel text="Perfil" />,
    },
    { type: "divider" },
    {
      key: "help",
      icon: getIcon("question"),
      label: <MenuLabel text="Ayuda y soporte" />,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: getIcon("logout"),
      danger: true,
      label: <MenuLabel text="Cerrar sesión" />,
      onClick: () => {
        signOut();
      },
    },
  ];

  return (
    <header className="absolute right-0 top-0 z-10">
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items,
          className:
            "!shadow-none !bg-transparent !p-1.5 min-w-64 " +
            "[&_.ant-dropdown-menu-item]:!py-2 " +
            "[&_.ant-dropdown-menu-item]:!rounded-lg " +
            "[&_.ant-dropdown-menu-item-icon]:!text-[17px] " +
            "[&_.ant-dropdown-menu-item-icon]:!mr-3",
        }}
        popupRender={(menu) => (
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg">
            {menu}
            <div className="border-t border-stone-100 p-1.5">
              <ThemeSwitch />
            </div>
          </div>
        )}
      >
        <section className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 bg-white py-2 pl-2 pr-4 shadow-sm">
          <span className="flex size-9 items-center justify-center rounded-lg bg-blue-500 text-base font-semibold text-white">
            {getInitials(profile?.fullName ?? "")}
          </span>
          <div className="flex flex-col justify-center leading-tight">
            <span className="font-medium text-stone-800">
              {profile?.fullName}
            </span>
            <span className="text-xs text-stone-500">
              {capitalize(profile?.roles?.[0] ?? "")}
            </span>
          </div>
          <DownOutlined className="text-[10px] text-stone-400" />
        </section>
      </Dropdown>
    </header>
  );
};
