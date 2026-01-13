import React from "react";

import { AgentCard } from "./index";
import { DetailsCard } from "../chat/chatRightContent/details-card";
import { DepartmentNameCard } from "./department-name-card";

import { Divider } from "@mui/material";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Stack from "@mui/material/Stack";
import TimeAgo from "react-timeago";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import { useAppSelector } from "@store/hooks";

export const AgentSidebar = (props) => {
  const agentState = useAppSelector((state) => state.agent);
  let agent = agentState.agents.find((agent) => agent.id == props.agent);

  return (
    <React.Fragment>
      {agent && (
        <React.Fragment>
          <div className="p-5">
            <AgentCard agent={agent} />
          </div>

          {agent.departments && Object.keys(agent.departments).length > 0 && (
            <DetailsCard
              title={"Departments"}
              badge={Object.keys(agent.departments).length}
              expanded={true}
            >
              <div className="flex flex-wrap  gap-1">
                {Object.keys(agent.departments).map((department, key) => {
                  return (
                    <DepartmentNameCard
                      key={key}
                      department={agent.departments[department]}
                    />
                  );
                })}
              </div>
            </DetailsCard>
          )}

          <div className="flex flex-col  w-full p-5">
            <div className="flex flex-col  gap-1">
              <div className="text-hv-color-3 text-[13px]">
                <Stack direction="row" alignItems="center" gap={1}>
                  <HubOutlinedIcon />
                  <span>Chat Limit</span>
                  <span>:</span>
                  <span>{agent.chat_limit}</span>
                </Stack>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />

            <div className="flex flex-col  gap-1">
              <div className="text-hv-color-3 text-[13px]">
                <Stack direction="row" alignItems="center" gap={1}>
                  <MarkChatUnreadOutlinedIcon />
                  <span>Active Chat</span>
                  <span>:</span>
                  <span>{agent.active_chat}</span>
                </Stack>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex flex-col  gap-1">
              <div className="text-hv-color-3 text-[13px]">
                <Stack direction="row" alignItems="center" gap={1}>
                  <CalendarMonthOutlinedIcon />
                  <span>Registration Date</span>
                  <span>:</span>
                  <span>
                    <TimeAgo date={new Date(agent.created_at * 1000)} />
                  </span>
                </Stack>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
