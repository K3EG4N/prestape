import { App, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { getIcon } from "@/utils/getIcon";
import type { IRowAction, IRowActionsProps } from "@/interfaces/IRowActions";

type MenuItems = NonNullable<MenuProps["items"]>;

const ICON_SIZE = 15;

export const RowActions = ({ actions }: IRowActionsProps) => {
  const { modal } = App.useApp();
  const visible = actions.filter((action) => !action.hidden);

  if (visible.length === 0) return null;

  const run = (action: IRowAction) => {
    if (!action.confirm) {
      action.onClick();
      return;
    }

    modal.confirm({
      title: action.confirm.title,
      content: action.confirm.content,
      okText: action.confirm.okText ?? "Confirmar",
      cancelText: "Cancelar",
      okButtonProps: { danger: action.danger },
      onOk: action.onClick,
    });
  };

  const firstDangerIndex = visible.findIndex((action) => action.danger);

  const items: MenuItems = visible.flatMap((action, index) => {
    const item = {
      key: action.key,
      label: action.label,
      icon: action.icon ? (
        <span style={{ fontSize: ICON_SIZE }}>{getIcon(action.icon)}</span>
      ) : undefined,
      danger: action.danger,
      disabled: action.disabled,
    };

    return index === firstDangerIndex && index > 0
      ? [{ type: "divider" as const }, item]
      : [item];
  });

  const handleClick: MenuProps["onClick"] = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    const action = visible.find((a) => a.key === key);
    if (action) run(action);
  };

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{ items, onClick: handleClick }}
    >
      <Button
        type="text"
        icon={getIcon("more")}
        aria-label="Acciones"
        onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  );
};
