import { AgentType } from "@/types/team/agent";

import { RightSidebarContext } from "@/components/layout/context/right-sidebar-context";
import React, { useState } from "react";
import { AgentSidebar } from "@/components/teams/agent-sidebar";
import { ResponsiveDataView, SortOption } from "@/components/datalist";
import { MobileRender } from "./Mobile";
import { DesktopColumns } from "./DesktopColumns";
import { SortConfig } from "@/components/datalist";

export const AgentList = ({
  agents,
  searchValue,
}: {
  agents: AgentType[];
  searchValue: string;
}) => {
  const { setSidebar } = React.use(RightSidebarContext);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: null,
  });

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

  const sortOptions: SortOption[] = [
    { key: "agent_name", label: "Name" },
    { key: "status", label: "Chat Limit" },
  ];
  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <ResponsiveDataView
        maxHeight="100%"
        sortable={true}
        data={agents}
        searchValue={searchValue}
        searchKeys={["agent_name", "email"]}
        desktopColumns={DesktopColumns}
        mobileRender={MobileRender}
        sortOptions={sortOptions}
        stickyHeader
        sortConfig={sortConfig} // ← EKLE
        onSortChange={setSortConfig} // ← EKLE
        onItemClick={(agent) => setSelectedAgent(agent)}
      />
    </div>
  );
};
