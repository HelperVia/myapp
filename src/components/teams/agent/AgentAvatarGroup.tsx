import { AgentType } from "@/types/team/agent";
import { AvatarGroup } from "@components/ui/avatar";
import { AgentAvatar } from "./AgentAvatar";

export const AgentAvatarGroup = ({ agents }: { agents: AgentType[] }) => {
  return (
    <AvatarGroup>
      {agents.map((agent) => (
        <AgentAvatar key={agent.id} variant="circle" agent={agent} />
      ))}
    </AvatarGroup>
  );
};
