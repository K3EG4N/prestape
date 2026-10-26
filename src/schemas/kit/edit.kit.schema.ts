import { z } from "zod";
import { baseKitFields } from "./base.kit.schema";

export const editKitSchema = z.object({
  name: baseKitFields.name,
  description: baseKitFields.description,
  equipmentIds: baseKitFields.equipmentIds,
});

export type EditKitSchema = z.infer<typeof editKitSchema>;
