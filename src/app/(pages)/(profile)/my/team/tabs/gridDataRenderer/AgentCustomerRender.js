import React from "react";
import Stack from "@mui/material/Stack";
import { AgentUserCard } from "@components/teams/agent-user-card";

export const AgentCustomerRender = (props) => {
  return (
    <React.Fragment>
      <div>
        <Stack direction="row" spacing={2}>
          <AgentUserCard agent={props.data} />
        </Stack>
      </div>
    </React.Fragment>
  );
};
