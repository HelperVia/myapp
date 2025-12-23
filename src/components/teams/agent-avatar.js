import React from "react";

import Avatar from "@mui/material/Avatar";
import { getColorFromUuid, extractInitials } from "@lib/helper.func";
import { Tooltip } from "@components/ui/tooltip/Tooltip";

export const AgentAvatar = ({ agent, tooltip = false, ...props }) => {
  return (
    <React.Fragment>
      {agent?.agent_name && (
        <Tooltip title={tooltip ? agent.agent_name : ""}>
          <Avatar
            {...props}
            sx={{
              color: "#fff!important",
              bgcolor: getColorFromUuid(agent.id),
            }}
          >
            {extractInitials(agent.agent_name)}
          </Avatar>
        </Tooltip>
      )}
    </React.Fragment>
  );
};
