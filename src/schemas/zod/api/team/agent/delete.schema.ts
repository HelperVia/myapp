import { z } from "zod";
import { IdValueSchema } from "@/schemas/zod/id.schema";
export const AgentDeleteSchema = z.object({
  id: IdValueSchema(),
});

export type AgentDeleteSchemaType = z.infer<typeof AgentDeleteSchema>;
