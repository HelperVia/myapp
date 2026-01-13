import { z } from "zod";
import { IdValueSchema } from "@/schemas/zod/id.schema";
import {
  AGENT_AUTO_ASSIGN_DISABLE,
  AGENT_AUTO_ASSIGN_ENABLE,
  AGENT_AWAY_DISABLE,
  AGENT_AWAY_ENABLE,
} from "@/constants/Agent";
export const AgentUpdateSchema = z.object({
  id: IdValueSchema(),
  away: z.enum([AGENT_AWAY_ENABLE, AGENT_AWAY_DISABLE]).optional(),
  chat_limit: z.number().int().min(0).max(99).optional(),
  agent_name: z.string().min(3).max(50).optional(),
  job_title: z.string().min(3).max(50).optional(),
  auto_assign: z
    .enum([AGENT_AUTO_ASSIGN_ENABLE, AGENT_AUTO_ASSIGN_DISABLE])
    .optional(),
});

export type AgentUpdateSchemaType = z.infer<typeof AgentUpdateSchema>;
