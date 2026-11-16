import type { ISettingsRowProps } from "@/interfaces/ISettings";

export const SettingsRow = ({
  title,
  description,
  error,
  children,
}: ISettingsRowProps) => (
  <div className="flex items-center justify-between gap-6 border-b border-stone-100 py-3 last:border-b-0">
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-medium text-stone-800">{title}</span>
      <span className="text-[13px] text-stone-500">{description}</span>
      {error && (
        <span className="text-[13px] text-(--ant-color-error)">{error}</span>
      )}
    </div>
    <div className="w-36 shrink-0">{children}</div>
  </div>
);
