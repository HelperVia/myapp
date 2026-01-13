import { AgentAwaysType } from "./agent-away.type";
import { AgentStatus } from "./agent-status.type";

export type AgentType = {
  active_chat: number;
  agent_name: string;
  auto_assign: string;
  away: AgentAwaysType;
  chat_limit: number;
  created_at: string;
  email: string;
  id: string;
  invited: string;
  role: string;
  role_description: string;
  source: string;
  status: AgentStatus;
  job_title?: string;
};
