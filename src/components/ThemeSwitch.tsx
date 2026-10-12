import { useState } from "react";
import { SunOutlined, MoonOutlined, DesktopOutlined } from "@ant-design/icons";

type Theme = "light" | "dark" | "system";

const themeOptions: {
  value: Theme;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "light",
    label: "Claro",
    icon: <SunOutlined className="text-[17px]" />,
  },
  {
    value: "dark",
    label: "Oscuro",
    icon: <MoonOutlined className="text-[17px]" />,
  },
  {
    value: "system",
    label: "Sistema",
    icon: <DesktopOutlined className="text-[17px]" />,
  },
];

export const ThemeSwitch = () => {
  const [value, setValue] = useState<Theme>("light");

  return (
    <div
      role="radiogroup"
      aria-label="Tema"
      className="grid grid-cols-3 gap-1 rounded-xl bg-stone-100 p-1"
    >
      {themeOptions.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setValue(opt.value)}
            className={`flex cursor-pointer items-center justify-center rounded-lg py-2 transition ${
              active
                ? "bg-white text-stone-800 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
};
