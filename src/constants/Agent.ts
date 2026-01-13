import { AgentAwayStatusType } from "@/types/team/agent";

export const AGENT_ROLE_OWNER = "O" as const;
export const AGENT_ROLE_SUPERADMIN = "S" as const;
export const AGENT_ROLE_AGENT = "A" as const;
export const AGENT_ROLE_UNKNOW = "?" as const;

export const AGENT_AWAY_ENABLE = "Y" as const;
export const AGENT_AWAY_DISABLE = "N" as const;

export const AGENT_STATUS_PENDING = "P" as const;
export const AGENT_STATUS_ACTIVE = "A" as const;
export const AGENT_STATUS_DELETED = "D" as const;
export const AGENT_STATUS_SUSPENDED = "S" as const;
export const AGENT_STATUS_CANCELED = "X" as const;

export const AGENT_AUTO_ASSIGN_ENABLE = "Y" as const;
export const AGENT_AUTO_ASSIGN_DISABLE = "N" as const;

export const AGENT_AWAY_STATUS: AgentAwayStatusType = {
  [AGENT_AWAY_DISABLE]: { label: "Available", value: true },
  [AGENT_AWAY_ENABLE]: { label: "Away", value: false },
};
