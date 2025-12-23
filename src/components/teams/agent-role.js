import React from "react";
import { Chip } from "@mui/material";
import {
  AGENT_ROLE_AGENT,
  AGENT_ROLE_OWNER,
  AGENT_ROLE_SUPERADMIN,
  AGENT_ROLE_UNKNOW,
} from "@constants/Agent";

export const AgentRole = ({ role, roleDesc, size }) => {
  const color = [];

  color[AGENT_ROLE_OWNER] = "orange";
  color[AGENT_ROLE_SUPERADMIN] = "info";
  color[AGENT_ROLE_AGENT] = "default";
  color[AGENT_ROLE_UNKNOW] = "error";
  return (
    <Chip
      sx={{
        borderRadius: "8px",
        fontSize: "12px",
      }}
      label={roleDesc}
      color={color[role]}
      size={size ? size : "small"}
    />
  );
};
