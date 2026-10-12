import {
  IdcardOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { House, Layers, LogOut, Users } from "lucide-react";
import type { ReactNode } from "react";

export type IconVariant = "outlined" | "filled";

export const iconResolver: Record<
  string,
  Partial<Record<IconVariant, ReactNode>>
> = {
  users: {
    outlined: <Users size={22} />,
  },
  home: {
    outlined: <House size={22} />,
  },
  catalog: {
    outlined: <Layers size={22} />,
  },
  settings: {
    outlined: <SettingOutlined size={22} />,
  },
  user: {
    outlined: <UserOutlined />,
  },
  idcard: {
    outlined: <IdcardOutlined />,
  },
  question: {
    outlined: <QuestionCircleOutlined />,
  },
  logout: {
    outlined: (
      <LogOut size={18} strokeWidth={2} style={{ marginLeft: "1.5px" }} />
    ),
  },
};

export const getIcon = (
  name: string | null,
  variant: IconVariant = "outlined",
): ReactNode => {
  if (!name) return null;

  return iconResolver[name]?.[variant] ?? iconResolver[name]?.outlined ?? null;
};
