import dayjs from "dayjs";
import type {
  ICategoryAvailability,
  IDueReturn,
  ILoanTrendPoint,
  IMemberStats,
  IMyLoan,
  IMyRequest,
  ITopEquipment,
  RequestStatus,
} from "@/interfaces/IDashboard";
import type { EquipmentAvailability } from "@/interfaces/IEquipment";

export const DASHBOARD_COLORS = {
  primary: "#1677ff",
  primarySoft: "#91caff",
  secondary: "#13c2c2",
  primaryBg: "#e6f4ff",
  neutral: "#d6d3d1",
  muted: "#a8a29e",
  success: "#52c41a",
  warning: "#faad14",
  danger: "#ff4d4f",
};

export const INVENTORY_SEGMENT_COLORS: Record<EquipmentAvailability, string> = {
  AVAILABLE: DASHBOARD_COLORS.primary,
  LOANED: DASHBOARD_COLORS.primarySoft,
  IN_MAINTENANCE: DASHBOARD_COLORS.neutral,
  RETIRED: DASHBOARD_COLORS.muted,
};

export const CATEGORY_VISIBLE_ITEMS = 2;

export const LOAN_WARNING_DAYS = 2;

export const LAB_CLOSING_TIME = "19:00";

export const TOP_EQUIPMENT_PERIOD = "Últimos 30 días";

export const REQUEST_STATUS_TAG: Record<
  RequestStatus,
  { label: string; color: string }
> = {
  PENDING: { label: "En revisión", color: "gold" },
  APPROVED: { label: "Aprobada", color: "green" },
  REJECTED: { label: "Rechazada", color: "red" },
};

const LOANS_BY_WEEK = [22, 28, 25, 34, 31, 40, 38, 46];
const RETURNS_BY_WEEK = [18, 24, 27, 29, 30, 33, 36, 40];

export const MOCK_LOAN_TREND: ILoanTrendPoint[] = LOANS_BY_WEEK.flatMap(
  (loans, i) => [
    { week: `Sem ${i + 1}`, type: "Préstamos", value: loans },
    { week: `Sem ${i + 1}`, type: "Devoluciones", value: RETURNS_BY_WEEK[i] },
  ],
);

export const MOCK_LOANS_IN_PERIOD = 186;

export const MOCK_TOP_EQUIPMENT: ITopEquipment[] = [
  { id: 1, code: "EQ-0001", serial: "CN-R6-0012", name: "Cámara Canon EOS R6", category: "Fotografía", loans: 38 },
  { id: 2, code: "EQ-0004", serial: "DL-XPS-0104", name: "Laptop Dell XPS 15", category: "Cómputo", loans: 31 },
  { id: 3, code: "EQ-0003", serial: "RD-NTG-0007", name: "Micrófono Rode NTG4+", category: "Audio", loans: 24 },
  { id: 4, code: "EQ-0002", serial: "MF-190-0031", name: "Trípode Manfrotto 190X", category: "Accesorios", loans: 19 },
];

export const MOCK_DUE_RETURNS_TODAY: IDueReturn[] = [
  { id: 1, code: "EQ-0004", serial: "DL-XPS-0104", item: "Laptop Dell XPS 15", borrower: "Camila Rojas", dueAt: dayjs().hour(10).minute(0).toISOString(), returned: true },
  { id: 2, code: "KT-0002", serial: "KIT-FOT-001", item: "Kit de fotografía", borrower: "Andrea Ramos", dueAt: dayjs().hour(11).minute(30).toISOString(), returned: true },
  { id: 3, code: "EQ-0005", serial: "LG-MX3-0218", item: "Mouse Logitech MX Master 3", borrower: "Valeria Chávez", dueAt: dayjs().hour(12).minute(0).toISOString(), returned: true },
  { id: 4, code: "EQ-0001", serial: "CN-R6-0012", item: "Cámara Canon EOS R6", borrower: "Piero Quispe", dueAt: dayjs().hour(16).minute(0).toISOString(), returned: false },
  { id: 5, code: "EQ-0003", serial: "RD-NTG-0007", item: "Micrófono Rode NTG4+", borrower: "Luis Torres", dueAt: dayjs().hour(17).minute(30).toISOString(), returned: false },
  { id: 6, code: "EQ-0002", serial: "MF-190-0031", item: "Trípode Manfrotto 190X", borrower: "Sofía Huamán", dueAt: dayjs().hour(18).minute(0).toISOString(), returned: false },
];

export const MOCK_MEMBER_STATS: IMemberStats = {
  activeLoans: 2,
  nextReturnInDays: 2,
  nextReturnDate: dayjs().add(2, "day").toISOString(),
  pendingRequests: 1,
  historyCount: 14,
  onTimeRate: 100,
};

export const MOCK_MY_LOANS: IMyLoan[] = [
  { id: 1, code: "EQ-0001", name: "Cámara Canon EOS R6", borrowedAt: dayjs().subtract(8, "day").toISOString(), dueAt: dayjs().add(2, "day").toISOString() },
  { id: 2, code: "KT-0001", name: "Kit de periféricos", borrowedAt: dayjs().subtract(3, "day").toISOString(), dueAt: dayjs().add(7, "day").toISOString() },
];

export const MOCK_MY_REQUESTS: IMyRequest[] = [
  { id: 1, item: "Micrófono Rode NTG4+", requestedAt: dayjs().subtract(1, "hour").toISOString(), status: "PENDING" },
  { id: 2, item: "Trípode Manfrotto 190X", requestedAt: dayjs().subtract(3, "day").toISOString(), status: "APPROVED" },
  { id: 3, item: "Laptop Dell XPS 15", requestedAt: dayjs().subtract(6, "day").toISOString(), status: "REJECTED" },
];

export const MOCK_CATEGORY_AVAILABILITY: ICategoryAvailability[] = [
  { id: 1, name: "Fotografía", available: 6, icon: "camera" },
  { id: 2, name: "Audio", available: 4, icon: "audio" },
  { id: 3, name: "Cómputo", available: 9, icon: "equipment" },
  { id: 4, name: "Periféricos", available: 7, icon: "keyboard" },
];
