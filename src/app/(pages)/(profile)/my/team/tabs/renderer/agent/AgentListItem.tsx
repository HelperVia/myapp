import { AgentType } from "@/types/team/agent";
import { AgentCustomerRender } from "./AgentCustomerRender";
import { RightSidebarContext } from "@/components/layout/context/right-sidebar-context";
import React from "react";
import { AgentSidebar } from "@/components/teams/agent-sidebar";
import { AgentActionsRender } from "./AgentActionsRender";
import { AgentStatusRender } from "./AgentStatusRender";
export const AgentListItem = ({ agent }: { agent: AgentType }) => {
  const { setSidebar } = React.use(RightSidebarContext);

  const setSelectedAgent = (agent: AgentType) => {
    setSidebar({
      component: <AgentSidebar agent={agent.id} />,
      className: "min-w-[300px] lg:min-w-[400px]",
      header: {
        title: "Details",
        close: true,
      },
    });
  };
  return (
    <div
      onClick={() => setSelectedAgent(agent)}
      key={agent.id}
      className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <AgentCustomerRender agent={agent} />
          </div>
        </div>

        <div>
          <AgentStatusRender agent={agent} />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">
                {agent?.chat_limit}
              </p>
              <p className="text-xs text-gray-500">Chat Limit</p>
            </div>
          </div>

          <div>
            <AgentActionsRender agent={agent} />
          </div>
        </div>
      </div>
    </div>
  );
};
