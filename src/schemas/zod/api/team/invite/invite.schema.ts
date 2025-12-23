import { AGENT_ROLE_AGENT, AGENT_ROLE_SUPERADMIN } from "@/constants/Agent";
import { z } from "zod";

export const teamInviteSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  role: z.enum([AGENT_ROLE_AGENT, AGENT_ROLE_SUPERADMIN]),
});

export type teamInviteSchemaType = z.infer<typeof teamInviteSchema>;
