import { getIcon } from "@/utils/getIcon";
import { Tooltip } from "antd";

export const SidebarItem = ({
  title,
  icon,
  active,
  onClick,
}: {
  title: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) => (
  <Tooltip title={title} placement="right">
    <div
      className={`text-xl cursor-pointer flex items-center justify-center w-full h-10.5 transition-colors rounded-lg border ${
        active
          ? "bg-blue-100/90 text-blue-400 border-blue-400"
          : "text-stone-500 border-transparent hover:bg-blue-100/90 hover:text-blue-400"
      }`}
      onClick={onClick}
    >
      {getIcon(icon)}
    </div>
  </Tooltip>
);
