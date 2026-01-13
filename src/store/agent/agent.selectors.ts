import { RootState } from "../index";

export const selectAllAgents = (state: RootState) => state.agent.agents;

export const selectAgentById = (id: string) => (state: RootState) =>
  state.agent.agents.find((a) => a.id === id);

export const selectAgentCount = (state: RootState) => state.agent.agents.length;
