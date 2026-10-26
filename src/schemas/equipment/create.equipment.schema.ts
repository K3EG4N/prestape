import { z } from "zod";
import { baseEquipmentFields } from "./base.equipment.schema";

export const createEquipmentSchema = z.object({
  name: baseEquipmentFields.name,
  serialNumber: baseEquipmentFields.serialNumber,
  description: baseEquipmentFields.description,
  categoryId: baseEquipmentFields.categoryId,
  condition: baseEquipmentFields.condition,
  conditionNotes: baseEquipmentFields.conditionNotes,
});

export type CreateEquipmentSchema = z.infer<typeof createEquipmentSchema>;
