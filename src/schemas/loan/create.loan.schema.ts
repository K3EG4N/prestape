import { z } from "zod";
import dayjs from "dayjs";
import { baseLoanFields } from "./base.loan.schema";
import { LOAN_MAX_EQUIPMENTS } from "@/constants/loan";
import { isWithinBusinessHours } from "@/utils/loan";
import type { ILoanRules } from "@/interfaces/ILoan";

export const buildCreateLoanSchema = (
  rules: ILoanRules | null,
  canManage: boolean,
) => {
  const maxEquipments = rules?.maxEquipments ?? LOAN_MAX_EQUIPMENTS;
  const minAdvanceHours = canManage ? 0 : (rules?.minAdvanceHours ?? 0);

  return z
    .object({
      requesterId: baseLoanFields.requesterId,
      equipmentIds: baseLoanFields.equipmentIds.max(maxEquipments, {
        error: `Puede seleccionar como máximo ${maxEquipments} equipos sueltos; usa un kit para llevar más`,
      }),
      kitId: baseLoanFields.kitId,
      scheduledPickupAt: baseLoanFields.scheduledPickupAt,
      scheduledReturnAt: baseLoanFields.scheduledReturnAt,
      notes: baseLoanFields.notes,
    })
    .refine(
      (data) => data.equipmentIds.length > 0 || data.kitId !== undefined,
      {
        path: ["equipmentIds"],
        error: "Seleccione al menos un equipo o kit",
      },
    )
    .refine(
      (data) =>
        data.scheduledPickupAt.isAfter(dayjs().add(minAdvanceHours, "hour")),
      {
        path: ["scheduledPickupAt"],
        error:
          minAdvanceHours > 0
            ? `El recojo debe programarse con al menos ${minAdvanceHours} h de anticipación`
            : "El recojo debe programarse en una fecha futura",
      },
    )
    .refine(
      (data) =>
        !rules ||
        isWithinBusinessHours(rules.businessHours, data.scheduledPickupAt),
      {
        path: ["scheduledPickupAt"],
        error: "El recojo debe programarse dentro del horario de atención",
      },
    )
    .refine((data) => data.scheduledReturnAt.isAfter(data.scheduledPickupAt), {
      path: ["scheduledReturnAt"],
      error: "La devolución debe ser posterior al recojo",
    })
    .refine(
      (data) =>
        !rules ||
        !data.scheduledReturnAt.isAfter(
          data.scheduledPickupAt.add(rules.maxDurationDays, "day"),
        ),
      {
        path: ["scheduledReturnAt"],
        error: `El préstamo no puede durar más de ${rules?.maxDurationDays} días`,
      },
    )
    .refine(
      (data) =>
        !rules ||
        isWithinBusinessHours(rules.businessHours, data.scheduledReturnAt),
      {
        path: ["scheduledReturnAt"],
        error: "La devolución debe programarse dentro del horario de atención",
      },
    );
};

export type CreateLoanSchema = z.infer<
  ReturnType<typeof buildCreateLoanSchema>
>;
