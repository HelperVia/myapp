import { z } from "zod";
import { IdValueSchema } from "@/schemas/zod/id.schema";
export const AgentSuspendSchema = z.object({
  id: IdValueSchema(),
});

export type AgentSuspendSchemaType = z.infer<typeof AgentSuspendSchema>;
