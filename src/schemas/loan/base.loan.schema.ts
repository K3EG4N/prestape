import { z } from "zod";
import dayjs, { type Dayjs } from "dayjs";
import { LOAN_MAX_EQUIPMENTS } from "@/constants/loan";

const dateTimeField = (message: string) =>
  z.custom<Dayjs>((value) => dayjs.isDayjs(value), { error: message });

export const baseLoanFields = {
  requesterId: z.number({ error: "Seleccione al solicitante" }),
  equipmentIds: z.array(z.number()).max(LOAN_MAX_EQUIPMENTS, {
    error: `Puede seleccionar como máximo ${LOAN_MAX_EQUIPMENTS} equipos`,
  }),
  kitId: z.number().optional(),
  scheduledPickupAt: dateTimeField("Seleccione la fecha y hora de recojo"),
  scheduledReturnAt: dateTimeField("Seleccione la fecha y hora de devolución"),
  notes: z
    .string()
    .max(255, {
      error: "Las observaciones no pueden superar los 255 caracteres",
    })
    .optional(),
};
