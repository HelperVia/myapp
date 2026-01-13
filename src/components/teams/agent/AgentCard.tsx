import { AgentAvatar, AgentRole } from "@components/teams/agent";

import { AgentType } from "@/types/team/agent/agent.type";
import { AgentRoles } from "@/types/team/agent";
import { AgentAwayStatus } from "@components/badge";
import { AGENT_AWAY_STATUS } from "@/constants/Agent";
import { AvatarProps } from "@/components/ui/avatar";

interface AgentCardType extends AvatarProps {
  agent: AgentType;
  jobTitle?: boolean;
  role?: boolean;
  email?: boolean;
  away?: boolean;
}
export const AgentCard = ({
  agent,
  jobTitle = false,
  role = true,
  email = true,
  away = false,
  ...avatarProps
}: AgentCardType) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <AgentAvatar {...avatarProps} agent={agent} />
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-md font-semibold text-gray-900">
              {agent.agent_name}
            </h2>
            {role && (
              <AgentRole
                label={agent.role_description}
                role={agent.role as AgentRoles}
              />
            )}
          </div>
          <div>
            {jobTitle && (
              <p className="text-sm text-gray-500">{agent.job_title}</p>
            )}
            {email && (
              <p className="text-xs text-gray-500 mt-1">{agent.email}</p>
            )}
          </div>
        </div>
      </div>
      {away && <AgentAwayStatus away={AGENT_AWAY_STATUS[agent.away]} />}
    </div>
  );
};
