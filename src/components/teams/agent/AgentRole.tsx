import React from "react";
import { AgentRoles } from "@/types/team/agent";
import {
  AGENT_ROLE_AGENT,
  AGENT_ROLE_OWNER,
  AGENT_ROLE_SUPERADMIN,
  AGENT_ROLE_UNKNOW,
} from "@constants/Agent";

type RoleConfigType = {
  className: string;
};
export const AgentRole = ({
  role,
  label,
}: {
  role: AgentRoles;
  label: string;
}) => {
  const roleConfig: Record<AgentRoles, RoleConfigType> = {
    [AGENT_ROLE_OWNER]: {
      className: "bg-gray-900 text-white",
    },
    [AGENT_ROLE_SUPERADMIN]: {
      className: "bg-blue-900 text-blue-700",
    },
    [AGENT_ROLE_AGENT]: {
      className: "bg-blue-100 text-gray-600",
    },
    [AGENT_ROLE_UNKNOW]: {
      className: "bg-red-100 text-gray-600",
    },
  };
  const config = roleConfig[role];

  return (
    <span
      className={`px-2 py-0.5  text-xs font-medium rounded-full ${config.className}`}
    >
      {label}
    </span>
  );
};
