import { AGENT_ROLE_AGENT, AGENT_ROLE_SUPERADMIN } from "@constants/Agent";
export type InviteType = {
  email: string;
  role: typeof AGENT_ROLE_AGENT | typeof AGENT_ROLE_SUPERADMIN;
};
