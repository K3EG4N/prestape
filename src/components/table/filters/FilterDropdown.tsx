import { useState } from "react";
import { Badge, Button, Checkbox, DatePicker, Dropdown, Radio } from "antd";
import { ClearOutlined, FilterOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { DATE_DISPLAY_FORMAT } from "@/constants/date";
import type {
  FilterDropdownItem,
  IDateRangeFilterItem,
  IFilterDropdownProps,
  IOptionsFilterItem,
} from "@/interfaces/IFilter";

type MenuItems = NonNullable<MenuProps["items"]>;

const KEY_SEPARATOR = "::";
const SUBMENU_POPUP_CLASS = "px-2.5!";
const CLEAR_KEY = "__clear__";

const toKey = (itemKey: string, value: string) =>
  `${itemKey}${KEY_SEPARATOR}${value}`;

const fromKey = (key: string) => {
  const index = key.indexOf(KEY_SEPARATOR);
  return [key.slice(0, index), key.slice(index + KEY_SEPARATOR.length)];
};

const countActive = (item: FilterDropdownItem) =>
  item.type === "options" ? item.value.length : item.value ? 1 : 0;

const clearItem = (item: FilterDropdownItem) =>
  item.type === "options" ? item.onChange([]) : item.onChange(null);

const withDescription = (
  item: FilterDropdownItem,
  fallback: string,
  children: MenuItems,
): MenuItems => [
  {
    type: "group",
    key: toKey(item.key, "group"),
    label: (
      <div className="flex flex-col gap-0.5 pb-1">
        <span className="text-[13px] font-medium text-stone-800">
          {item.title ?? item.label}
        </span>
        <span className="text-xs text-stone-400">
          {item.description ?? fallback}
        </span>
      </div>
    ),
    children,
  },
];

const buildOptionChildren = (item: IOptionsFilterItem): MenuItems =>
  withDescription(
    item,
    item.multiple === false
      ? "Selecciona una opción"
      : "Puedes seleccionar varias opciones",
    item.options.map((option) => {
      const checked = item.value.includes(option.value);
      const control =
        item.multiple === false ? (
          <Radio checked={checked} className="pointer-events-none">
            {option.label}
          </Radio>
        ) : (
          <Checkbox checked={checked} className="pointer-events-none">
            {option.label}
          </Checkbox>
        );

      return { key: toKey(item.key, option.value), label: control };
    }),
  );

const buildDateChildren = (item: IDateRangeFilterItem): MenuItems =>
  withDescription(item, "Selecciona un rango de fechas", [
    {
      key: toKey(item.key, "range"),
      className: "cursor-default! hover:bg-transparent!",
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <DatePicker.RangePicker
            className="w-60"
            format={DATE_DISPLAY_FORMAT}
            placeholder={["Desde", "Hasta"]}
            value={item.value}
            onChange={(dates) =>
              item.onChange(
                dates?.[0] && dates[1] ? [dates[0], dates[1]] : null,
              )
            }
            getPopupContainer={(node) => node.parentElement ?? document.body}
          />
        </div>
      ),
    },
  ]);

export const FilterDropdown = ({
  items,
  label = "Filtros",
}: IFilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const activeCount = items.filter((item) => countActive(item) > 0).length;

  const menuItems: MenuItems = items.map((item) => {
    const count = countActive(item);

    return {
      key: item.key,
      icon: item.icon,
      popupClassName: SUBMENU_POPUP_CLASS,
      label: (
        <span className="flex w-full items-center justify-between gap-6">
          {item.label}
          {count > 0 && <Badge count={count} size="small" color="blue" />}
        </span>
      ),
      children:
        item.type === "options"
          ? buildOptionChildren(item)
          : buildDateChildren(item),
    };
  });

  if (activeCount > 0) {
    menuItems.push(
      { type: "divider" },
      { key: CLEAR_KEY, label: "Limpiar filtros", icon: <ClearOutlined /> },
    );
  }

  const handleOptionClick = (item: IOptionsFilterItem, value: string) => {
    const checked = item.value.includes(value);

    if (item.multiple === false) {
      item.onChange(checked ? [] : [value]);
      return;
    }

    item.onChange(
      checked ? item.value.filter((v) => v !== value) : [...item.value, value],
    );
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === CLEAR_KEY) {
      items.forEach(clearItem);
      setOpen(false);
      return;
    }

    const [itemKey, value] = fromKey(key);
    const item = items.find((i) => i.key === itemKey);
    if (item?.type === "options") handleOptionClick(item, value);
  };

  return (
    <Badge count={activeCount} size="small" color="blue">
      <Dropdown
        open={open}
        onOpenChange={(next, info) => {
          if (info.source === "trigger") setOpen(next);
        }}
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
          selectable: false,
          multiple: true,
        }}
      >
        <Button icon={<FilterOutlined />}>{label}</Button>
      </Dropdown>
    </Badge>
  );
};
