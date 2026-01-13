import React, { useState } from "react";

import { Popover } from "@/components/ui/popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DeleteAgentAction } from "../actions/agent/agent-delete-action";
import { ChangeChatLimitAction } from "../actions/agent/change-chat-limit-action";
import { AgentDetailAction } from "../actions/agent/agent-detail-action";
import { CancelInviteAction } from "../actions/agent/cancel-invite-action";
import { SuspendAgentAction } from "../actions/agent/suspend-agent-action";
import { AgentType } from "@/types/team/agent";
import Button from "@/components/ui/Button";

export const AgentActionsRender = ({ agent }: { agent: AgentType }) => {
  return (
    <Popover
      trigger={
        <Button iconOnly aria-label="delete" variant="ghost" size="md">
          <MoreVertIcon fontSize="inherit" />
        </Button>
      }
      content={
        <div className="py-3 px-1 min-w-[160px]">
          <AgentDetailAction agent={agent} />
          <ChangeChatLimitAction agent={agent} />
          <DeleteAgentAction agent={agent} />
          <CancelInviteAction agent={agent} />
          <SuspendAgentAction agent={agent} />
        </div>
      }
    />
  );
};
