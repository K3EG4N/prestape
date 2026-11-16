import type { ISettingsGroupProps } from "@/interfaces/ISettings";

export const SettingsGroup = ({ title, children }: ISettingsGroupProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-semibold tracking-wide text-stone-400 uppercase">
      {title}
    </span>
    {children}
  </div>
);
