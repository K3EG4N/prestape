import type { ILoanDetailSectionProps } from "@/interfaces/ILoan";

export const LoanDetailSection = ({
  title,
  children,
}: ILoanDetailSectionProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-[13px] font-semibold text-stone-800">{title}</span>
    {children}
  </div>
);
