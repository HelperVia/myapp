import React from "react";
import { AvatarGroup } from "@mui/material";
import { AgentAvatar } from "@components/teams/agent-avatar";
import { useAppSelector } from "@store/hooks";

export const DepartmentMembersRender = (props) => {
  const chatprop = useAppSelector((state) => state.app);
  const agents = chatprop.agents;
  return (
    <React.Fragment>
      <div>
        <AvatarGroup total={props.data.agents.length}>
          {Object.keys(props.data.agents).map((index) => {
            let agent = agents.find(
              (agent) => agent.id == props.data.agents[index].id
            );
            if (typeof agent !== "undefined") {
              return (
                <AgentAvatar
                  tooltip={true}
                  agent={{
                    agent_name: agent.agent_name,
                    first_letter: agent.first_letter,
                  }}
                />
              );
            }
          })}
        </AvatarGroup>
      </div>
    </React.Fragment>
  );
};
