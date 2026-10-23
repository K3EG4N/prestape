import { useState } from "react";
import { Badge, Button, Checkbox, Dropdown } from "antd";
import { getIcon } from "@/utils/getIcon";
import type { MenuProps } from "antd";
import type { IColumnSettingsProps } from "@/interfaces/IDataTable";

const RESET_KEY = "__reset__";

export const ColumnSettings = <T,>({
  columns,
  hiddenKeys,
  onToggle,
  onReset,
}: IColumnSettingsProps<T>) => {
  const [open, setOpen] = useState(false);

  const hideable = columns.filter((col) => col.hideable);
  const visibleCount = columns.length - hiddenKeys.length;

  if (hideable.length === 0) return null;

  const items: NonNullable<MenuProps["items"]> = [
    {
      type: "group",
      key: "group",
      label: (
        <div className="flex flex-col gap-0.5 pb-1">
          <span className="text-[13px] font-medium text-stone-800">
            Columnas visibles
          </span>
          <span className="text-xs text-stone-400">
            Elige qué columnas mostrar en la tabla
          </span>
        </div>
      ),
      children: hideable.map((col) => {
        const visible = !hiddenKeys.includes(col.key);
        const locked = visible && visibleCount <= 1;

        return {
          key: col.key,
          disabled: locked,
          label: (
            <Checkbox
              checked={visible}
              disabled={locked}
              className="pointer-events-none"
            >
              {col.title}
            </Checkbox>
          ),
        };
      }),
    },
  ];

  if (hiddenKeys.length > 0) {
    items.push(
      { type: "divider" },
      { key: RESET_KEY, label: "Mostrar todas", icon: getIcon("view") },
    );
  }

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === RESET_KEY) {
      onReset();
      setOpen(false);
      return;
    }
    onToggle(key);
  };

  return (
    <Badge count={hiddenKeys.length} size="small" color="blue">
      <Dropdown
        open={open}
        onOpenChange={(next, info) => {
          if (info.source === "trigger") setOpen(next);
        }}
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items,
          onClick: handleClick,
          selectable: false,
          className: "pb-2.5!",
        }}
      >
        <Button icon={getIcon("columns")}>Columnas</Button>
      </Dropdown>
    </Badge>
  );
};
