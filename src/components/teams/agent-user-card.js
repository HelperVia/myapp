import React from "react";

import { AgentAvatar } from "@components/teams/agent-avatar";
import { AgentRole } from "@components/teams/agent-role";
import { useAppSelector } from "@store/hooks";
export const AgentUserCard = ({
  agent,
  roleShow = true,
  emailShow = true,
  avatarClassName = "w-[50px] h-[50px]",
  agentNameClassName = "",
  agentVariant = "dot",
}) => {
  const agentState = useAppSelector((state) => state.agent);
  let agent_item = agentState.agents.find((agents) => agents.id == agent.id);

  return (
    <React.Fragment>
      {agent_item && (
        <div className="flex flex-row items-center gap-4 max-h-[50px]">
          <div>
            <AgentAvatar
              variant={agentVariant}
              agent={agent_item}
              colourful="true"
              className={avatarClassName}
            />
          </div>
          <div className="flex flex-col leading-normal gap-1">
            <div className="flex flex-row gap-1">
              <span className={"font-semibold text-sm " + agentNameClassName}>
                {agent_item.agent_name}
              </span>
              {roleShow && (
                <AgentRole
                  roleDesc={agent_item.role_description}
                  role={agent_item.role}
                />
              )}
            </div>
            {emailShow && (
              <div className="text-hv-color-18 text-xs">{agent_item.email}</div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
