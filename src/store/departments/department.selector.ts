import { selectAgentById } from "../agent/agent.selectors";
import { RootState } from "../index";

export const getWithAgents = (state: RootState) => {
  return state.departments.departments.map((department) => {
    const agents = department.agent_ids.map((id) => selectAgentById(id)(state));
    return {
      ...department,
      agents,
    };
  });
};
