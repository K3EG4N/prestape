import { getIcon } from "@/utils/getIcon";
import type { ISettingsPanelProps } from "@/interfaces/ISettings";

export const SettingsPanel = ({
  title,
  description,
  icon,
  children,
  footer,
}: ISettingsPanelProps) => (
  <section className="flex flex-col rounded-xl border border-stone-200 bg-surface">
    <header className="flex items-center gap-3 border-b border-stone-200 px-6 py-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg text-(--ant-color-primary)">
        {getIcon(icon)}
      </span>
      <div className="flex flex-col">
        <h2 className="m-0 text-base font-semibold text-stone-800">{title}</h2>
        <p className="m-0 text-sm text-stone-500">{description}</p>
      </div>
    </header>
    <div className="flex flex-col gap-5 px-6 py-5">{children}</div>
    {footer && (
      <footer className="border-t border-stone-200 px-6 py-3">{footer}</footer>
    )}
  </section>
);
