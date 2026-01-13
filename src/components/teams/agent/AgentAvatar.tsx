import { Tooltip } from "@/components/ui/Tooltip";
import { Avatar, AvatarProps } from "@/components/ui/avatar";
import { AgentType } from "@/types/team/agent";

interface AgentAvatarProps extends AvatarProps {
  agent: AgentType | null;
  tooltip?: boolean;
}

export const AgentAvatar = ({
  agent,
  tooltip = true,
  ...avatarProps
}: AgentAvatarProps) => {
  if (!agent?.agent_name) return null;

  const avatarElement = (
    <Avatar
      variant="square"
      status="online"
      uuid={agent.id}
      name={agent.agent_name}
      {...avatarProps}
    />
  );

  if (!tooltip) {
    return avatarElement;
  }

  return (
    <Tooltip title={`${agent.agent_name}`} placement="top">
      <span style={{ display: "inline-block", lineHeight: 0 }}>
        {avatarElement}
      </span>
    </Tooltip>
  );
};

export default AgentAvatar;
