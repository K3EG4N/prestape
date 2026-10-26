import { z } from "zod";
import { baseEquipmentFields } from "./base.equipment.schema";

export const editEquipmentSchema = z.object({
  name: baseEquipmentFields.name,
  serialNumber: baseEquipmentFields.serialNumber,
  description: baseEquipmentFields.description,
  categoryId: baseEquipmentFields.categoryId,
  availability: baseEquipmentFields.availability,
  condition: baseEquipmentFields.condition,
  conditionNotes: baseEquipmentFields.conditionNotes,
});

export type EditEquipmentSchema = z.infer<typeof editEquipmentSchema>;
