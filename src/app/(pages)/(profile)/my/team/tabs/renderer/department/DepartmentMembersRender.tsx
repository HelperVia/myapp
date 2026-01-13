import { AgentAvatarGroup } from "@/components/teams/agent/AgentAvatarGroup";
import { AgentType } from "@/types/team/agent";
import { DepartmentType } from "@/types/team/department";

export const DepartmentMembersRender = ({
  department,
}: {
  department: DepartmentType;
}) => {
  return <AgentAvatarGroup agents={department.agents as AgentType[]} />;
};
