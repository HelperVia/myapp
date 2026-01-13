import { TableColumn } from "@/components/datalist";
import { AgentAvatar, AgentCard } from "@/components/teams";
import { AgentType } from "@/types/team/agent";
import { AgentStatusRender } from "../AgentStatusRender";
import { AgentActionsRender } from "../AgentActionsRender";

export const DesktopColumns: TableColumn<AgentType>[] = [
  {
    key: "agent_name",
    header: "Agent",
    sortable: true,
    render: (agent) => <AgentCard agent={agent} />,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (agent) => <AgentStatusRender agent={agent} />,
  },

  {
    key: "actions",
    header: "Actions",
    render: (agent) => <AgentActionsRender agent={agent} />,
  },
];
