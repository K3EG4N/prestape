import { z } from "zod";
import dayjs from "dayjs";
import { baseLoanFields } from "./base.loan.schema";

export const createLoanSchema = z
  .object({
    requesterId: baseLoanFields.requesterId,
    equipmentIds: baseLoanFields.equipmentIds,
    kitId: baseLoanFields.kitId,
    scheduledPickupAt: baseLoanFields.scheduledPickupAt,
    scheduledReturnAt: baseLoanFields.scheduledReturnAt,
    notes: baseLoanFields.notes,
  })
  .refine((data) => data.equipmentIds.length > 0 || data.kitId !== undefined, {
    path: ["equipmentIds"],
    error: "Seleccione al menos un equipo o kit",
  })
  .refine((data) => data.scheduledPickupAt.isAfter(dayjs()), {
    path: ["scheduledPickupAt"],
    error: "El recojo debe programarse en una fecha futura",
  })
  .refine((data) => data.scheduledReturnAt.isAfter(data.scheduledPickupAt), {
    path: ["scheduledReturnAt"],
    error: "La devolución debe ser posterior al recojo",
  });

export type CreateLoanSchema = z.infer<typeof createLoanSchema>;
