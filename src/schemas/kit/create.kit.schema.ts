import { z } from "zod";
import { baseKitFields } from "./base.kit.schema";

export const createKitSchema = z.object({
  name: baseKitFields.name,
  description: baseKitFields.description,
  equipmentIds: baseKitFields.equipmentIds,
});

export type CreateKitSchema = z.infer<typeof createKitSchema>;
