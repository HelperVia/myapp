import { YesNo } from "@/shared/constants/YesNo";
import { DepartmentStatus } from "./department-status.type";
import { AgentType } from "../agent";

export type DepartmentType = {
  id: string;
  department_name: string;
  default: YesNo;
  agent_ids: string[];
  agents?: AgentType[];
  status: DepartmentStatus;
};
