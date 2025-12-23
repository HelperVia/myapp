export type AgentType = {
  active_chat: number;
  agent_name: string;
  auto_assign: string;
  away: string;
  chat_limit: number;
  created_at: string;
  email: string;
  id: string;
  invited: string;
  role: string;
  role_description: string;
  source: string;
  status: string;
};

export type TeamType = {
  agents: AgentType[];
};
