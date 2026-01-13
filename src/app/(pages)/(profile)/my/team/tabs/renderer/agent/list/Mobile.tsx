import { AgentAvatar, AgentCard } from "@/components/teams";
import { AgentType } from "@/types/team/agent";
import { AgentStatusRender } from "../AgentStatusRender";
import { AgentActionsRender } from "../AgentActionsRender";

export const MobileRender = (agent: AgentType) => (
  <div className="bg-white rounded-lg border border-gray-200 p-3">
    <div className="flex items-start justify-between mb-3 pb-3 border-b border-gray-100">
      <div className="flex-1 min-w-0 mr-2">
        <AgentCard agent={agent} />
      </div>
      <AgentStatusRender agent={agent} />
    </div>

    <div className="flex justify-end">
      <AgentActionsRender agent={agent} />
    </div>
  </div>
);
