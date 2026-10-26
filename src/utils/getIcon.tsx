import {
  AppstoreOutlined,
  AudioOutlined,
  CalendarOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  EyeOutlined,
  IdcardOutlined,
  LaptopOutlined,
  MoreOutlined,
  PlusOutlined,
  ProductOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
  SettingOutlined,
  SolutionOutlined,
  StopOutlined,
  SwapOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  CloudDownload,
  Columns3,
  House,
  Keyboard,
  Layers,
  LogOut,
  RefreshCcw,
  UserPlus,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

export type IconVariant = "outlined" | "filled";

type IconEntry = Partial<Record<IconVariant, ReactNode>>;

export const iconResolver = {
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
  more: {
    outlined: <MoreOutlined />,
  },
  view: {
    outlined: <EyeOutlined />,
  },
  edit: {
    outlined: <EditOutlined />,
  },
  delete: {
    outlined: <DeleteOutlined />,
  },
  roles: {
    outlined: <SafetyOutlined />,
  },
  profile: {
    outlined: <SolutionOutlined />,
  },
  calendar: {
    outlined: <CalendarOutlined />,
  },
  check: {
    outlined: <CheckCircleOutlined />,
  },
  warning: {
    outlined: <ExclamationCircleOutlined />,
  },
  refresh: {
    outlined: <RefreshCcw size={16} />,
  },
  suspend: {
    outlined: <StopOutlined />,
  },
  reactivate: {
    outlined: <UnlockOutlined />,
  },
  equipment: {
    outlined: <LaptopOutlined />,
  },
  kits: {
    outlined: <ProductOutlined />,
  },
  plus: {
    outlined: <PlusOutlined />,
  },
  categories: {
    outlined: <AppstoreOutlined />,
  },
  "user-add": {
    outlined: <UserPlus size={16} />,
  },
  download: {
    outlined: <CloudDownload size={16} />,
  },
  columns: {
    outlined: <Columns3 size={16} />,
  },
  loans: {
    outlined: <SwapOutlined />,
  },
  clock: {
    outlined: <ClockCircleOutlined />,
  },
  history: {
    outlined: <HistoryOutlined />,
  },
  camera: {
    outlined: <CameraOutlined />,
  },
  audio: {
    outlined: <AudioOutlined />,
  },
  keyboard: {
    outlined: <Keyboard size={16} />,
  },
} satisfies Record<string, IconEntry>;

export type IconName = keyof typeof iconResolver;

export const getIcon = (
  name: string | null,
  variant: IconVariant = "outlined",
): ReactNode => {
  if (!name) return null;

  const entry = (iconResolver as Record<string, IconEntry>)[name];
  return entry?.[variant] ?? entry?.outlined ?? null;
};
