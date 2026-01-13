import React from "react";
import Stack from "@mui/material/Stack";
import { AgentCard } from "@components/teams/index";
import { AgentType } from "@/types/team/agent";

export const AgentCustomerRender = ({ agent }: { agent: AgentType }) => {
  return (
    <React.Fragment>
      <div>
        <Stack direction="row" spacing={2}>
          <AgentCard agent={agent} jobTitle={true} />
        </Stack>
      </div>
    </React.Fragment>
  );
};
