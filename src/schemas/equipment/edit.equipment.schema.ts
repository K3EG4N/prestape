import { z } from "zod";
import { DAMAGED_EQUIPMENT_AVAILABILITIES } from "@/constants/equipment";
import { baseEquipmentFields } from "./base.equipment.schema";

export const editEquipmentSchema = z
  .object({
    name: baseEquipmentFields.name,
    serialNumber: baseEquipmentFields.serialNumber,
    description: baseEquipmentFields.description,
    categoryId: baseEquipmentFields.categoryId,
    availability: baseEquipmentFields.availability,
    condition: baseEquipmentFields.condition,
    conditionNotes: baseEquipmentFields.conditionNotes,
  })
  .refine(
    (data) =>
      data.condition !== "DAMAGED" ||
      DAMAGED_EQUIPMENT_AVAILABILITIES.includes(data.availability),
    {
      path: ["availability"],
      error: "Un equipo dañado solo puede estar en mantenimiento o de baja",
    },
  );

export type EditEquipmentSchema = z.infer<typeof editEquipmentSchema>;
