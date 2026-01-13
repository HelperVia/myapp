import { AgentType } from "./agent";
import { DepartmentType } from "./department";

export type TeamType = {
  agents: AgentType[];
  departments: DepartmentType[];
};
