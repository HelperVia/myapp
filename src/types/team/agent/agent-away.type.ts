import { AGENT_AWAY_ENABLE, AGENT_AWAY_DISABLE } from "@/constants/Agent";

export type AgentAwaysType =
  | typeof AGENT_AWAY_ENABLE
  | typeof AGENT_AWAY_DISABLE;

export type AgentAwayStatusChildType = {
  label: string;
  value: boolean;
};

export type AgentAwayStatusType = Record<
  AgentAwaysType,
  AgentAwayStatusChildType
>;
