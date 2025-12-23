import { TeamType } from "@/types/team/agent/agent.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TeamType = {
  agents: [],
};
const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    updateAgent(state, action) {
      const { id, changes } = action.payload;
      const agent = state.agents.find((a) => a.id === id);

      if (agent) {
        Object.assign(agent, changes);
      }
    },
    setAllAgents(state, action) {
      Object.assign(state.agents, action.payload);
    },
  },
});

export const { updateAgent, setAllAgents } = agentSlice.actions;
export default agentSlice.reducer;
