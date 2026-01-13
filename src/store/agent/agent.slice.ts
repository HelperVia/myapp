import { TeamType } from "@/types/team/teams.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Omit<TeamType, "departments"> = {
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
    addAgent(state, action) {
      const newAgent = action.payload;
      state.agents.push(newAgent);
    },
    deleteAgent(state, action) {
      const idToDelete = action.payload;
      state.agents = state.agents.filter((agent) => agent.id !== idToDelete);
    },
    setAllAgents(state, action) {
      Object.assign(state.agents, action.payload);
    },
  },
});

export const { updateAgent, setAllAgents, deleteAgent, addAgent } =
  agentSlice.actions;
export default agentSlice.reducer;
