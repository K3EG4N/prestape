import type { DefaultValues } from "react-hook-form";
import { INITIAL_BASE_FILTERS } from "./filters";
import type {
  ILoanFilters,
  ILoanOptions,
  ILoanStatusDisplay,
  LoanStatus,
} from "@/interfaces/ILoan";
import type { CreateLoanSchema } from "@/schemas/loan/create.loan.schema";

export const LOAN_VISIBLE_ITEMS = 3;

export const INITIAL_LOAN_FILTERS: ILoanFilters = {
  ...INITIAL_BASE_FILTERS,
  statuses: [],
  scheduledPickupAt: null,
  scheduledReturnAt: null,
};

export const EMPTY_LOAN_OPTIONS: ILoanOptions = {
  requesters: [],
  kits: [],
};

export const LOAN_OPTIONS_SEARCH_DELAY = 400;

export const LOAN_MINUTE_STEP = 15;

export const LOAN_MAX_EQUIPMENTS = 2;

export const CREATE_LOAN_DEFAULT_VALUES: DefaultValues<CreateLoanSchema> = {
  requesterId: undefined,
  equipmentIds: [],
  kitId: undefined,
  scheduledPickupAt: undefined,
  scheduledReturnAt: undefined,
  notes: "",
};

export const LOAN_STATUS_DISPLAY: Record<LoanStatus, ILoanStatusDisplay> = {
  PENDING_PICKUP: { label: "Pendiente de recojo", color: "gold" },
  ACTIVE: { label: "En curso", color: "blue" },
  RETURNED: { label: "Devuelto", color: "green" },
  RETURNED_LATE: { label: "Devuelto con retraso", color: "orange" },
  OVERDUE: { label: "Vencido", color: "red" },
  CANCELLED: { label: "Cancelado", color: "default" },
};

export const LOAN_STATUS_FILTER_OPTIONS = (
  Object.keys(LOAN_STATUS_DISPLAY) as LoanStatus[]
).map((value) => ({
  value,
  label: LOAN_STATUS_DISPLAY[value].label,
}));
