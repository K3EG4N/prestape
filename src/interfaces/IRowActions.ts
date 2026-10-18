import type { IconName } from "@/utils/getIcon";

export interface IRowActionConfirm {
  title: string;
  content?: string;
  okText?: string;
}

export interface IRowAction {
  key: string;
  label: string;
  icon?: IconName;
  onClick: () => void;
  danger?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  confirm?: IRowActionConfirm;
}

export interface IRowActionsProps {
  actions: IRowAction[];
}
