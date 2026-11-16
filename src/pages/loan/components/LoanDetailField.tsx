import type { ILoanDetailFieldProps } from "@/interfaces/ILoan";

export const LoanDetailField = ({ label, children }: ILoanDetailFieldProps) => (
  <div className="flex items-center justify-between gap-3 py-1">
    <span className="text-[13px] text-stone-500">{label}</span>
    <span className="text-right text-[13px] font-medium text-stone-800">
      {children}
    </span>
  </div>
);
