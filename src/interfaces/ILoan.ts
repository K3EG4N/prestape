import type { ReactNode } from "react";
import type { IBaseFilters, IBaseListRequest } from "./IBaseFilter";
import type { IDisclosure } from "./IDisclosure";
import type { DateRange } from "./IFilter";
import type { EquipmentCondition } from "./IEquipment";
import type { ISettingsBusinessDay } from "./ISettings";

export type LoanStatus =
  | "PENDING_PICKUP"
  | "ACTIVE"
  | "RETURNED"
  | "RETURNED_LATE"
  | "OVERDUE"
  | "CANCELLED";

export interface ILoanRequester {
  fullName: string;
  code: string;
}

export interface ILoanKit {
  code: string;
  name: string;
}

export interface ILoanItem {
  id: number;
  code: string;
  name: string;
  currentCondition: EquipmentCondition;
  pickupCondition: EquipmentCondition | null;
  returnCondition: EquipmentCondition | null;
}

export interface ILoan {
  id: number;
  code: string;
  requester: ILoanRequester;
  kit: ILoanKit | null;
  items: ILoanItem[];
  scheduledPickupAt: string;
  pickedUpAt: string | null;
  scheduledReturnAt: string;
  returnedAt: string | null;
  deliveredBy: string | null;
  receivedBy: string | null;
  cancelledAt: string | null;
  registeredBy: string | null;
  notes: string | null;
  status: LoanStatus;
  createdAt: string;
}

export interface ILoanRowHandlers {
  onView: (loan: ILoan) => void;
  onRegisterPickup: (loan: ILoan) => void;
  onRegisterReturn: (loan: ILoan) => void;
  onCancel: (loan: ILoan) => void;
}

export interface ILoanStatusDisplay {
  label: string;
  color: string;
}

export interface ILoanDetailModalProps extends IDisclosure {
  loan: ILoan | null;
}

export interface ICancelLoanModalProps extends IDisclosure {
  loan: ILoan | null;
}

export interface ILoanDetailFieldProps {
  label: string;
  children: ReactNode;
}

export interface ILoanHandoverSectionProps {
  title: string;
  scheduledAt: string;
  actualAt: string | null;
  actualLabel: string;
  handledBy: string | null;
  handledByLabel: string;
  late?: boolean;
}

export interface ILoanDetailSectionProps {
  title: string;
  children: ReactNode;
}

export interface ILoanRequesterOption {
  id: number;
  name: string;
  description: string;
}

export interface ILendableEquipmentOption {
  id: number;
  code: string;
  name: string;
  condition: EquipmentCondition;
}

export interface ILendableKitOption {
  id: number;
  code: string;
  name: string;
  items: ILendableEquipmentOption[];
}

export interface ICreateLoanRequest {
  requesterId: number;
  equipmentIds: number[];
  kitId?: number;
  scheduledPickupAt: string;
  scheduledReturnAt: string;
  notes?: string;
}

export interface ILoanItemConditionRequest {
  equipmentId: number;
  condition: EquipmentCondition;
}

export interface IRegisterPickupRequest {
  items: ILoanItemConditionRequest[];
}

export interface IRegisterReturnRequest {
  items: ILoanItemConditionRequest[];
}

export interface IRegisterPickupModalProps extends IDisclosure {
  loan: ILoan | null;
}

export interface IRegisterReturnModalProps extends IDisclosure {
  loan: ILoan | null;
}

export interface ILoanRules {
  toleranceMinutes: number;
  maxDurationDays: number;
  minAdvanceHours: number;
  autoCancelHours: number;
  maxEquipments: number | null;
  maxActiveLoans: number | null;
  businessHours: ISettingsBusinessDay[];
}

export interface ILoanOptions {
  requesters: ILoanRequesterOption[];
  kits: ILendableKitOption[];
}

export interface ILoanFilters extends IBaseFilters {
  statuses: string[];
  scheduledPickupAt: DateRange | null;
  scheduledReturnAt: DateRange | null;
}

export interface ILoanFilterParams {
  search?: string;
  statuses: string[];
  pickupFrom?: string;
  pickupTo?: string;
  returnFrom?: string;
  returnTo?: string;
}

export interface ILoanListRequest extends IBaseListRequest {
  statuses?: string[];
  pickupFrom?: string;
  pickupTo?: string;
  returnFrom?: string;
  returnTo?: string;
}
