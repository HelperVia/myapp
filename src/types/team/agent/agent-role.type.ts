import {
  AGENT_ROLE_AGENT,
  AGENT_ROLE_OWNER,
  AGENT_ROLE_SUPERADMIN,
  AGENT_ROLE_UNKNOW,
} from "@/constants/Agent";

export type AgentRoles =
  | typeof AGENT_ROLE_AGENT
  | typeof AGENT_ROLE_OWNER
  | typeof AGENT_ROLE_SUPERADMIN
  | typeof AGENT_ROLE_UNKNOW;
