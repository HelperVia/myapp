import React, { useState } from "react";
import { Popover } from "@/components/ui/popover";
import {
  AGENT_AWAY_ENABLE,
  AGENT_AWAY_DISABLE,
  AGENT_AWAY_STATUS,
} from "@constants/Agent";
import { useAppDispatch } from "@store/hooks";

import { AgentInviteStatus } from "./AgentInviteStatus";
import { YES } from "@shared/constants/YesNo";
import { AgentAwayStatus } from "@/components/badge";
import { updateAgent } from "@/store/agent/agent.slice";
import { apiFetch } from "@/lib/api/api.fetch";
import { AgentAwaysType, AgentType } from "@/types/team/agent";

export const AgentStatusRender = ({ agent }: { agent: AgentType }) => {
  const dispatch = useAppDispatch();

  const [closePopover, setClosePopover] = useState(true);
  const changeAgentAwayStatus = async (new_status: AgentAwaysType) => {
    setClosePopover(!closePopover);
    if (new_status != agent.away) {
      const response = await apiFetch<{ agent: AgentType }>(
        "/api/team/agent/" + agent.id + "/update",
        {
          method: "POST",
          body: JSON.stringify({
            away: new_status,
          }),
        }
      );

      if (response?.ok) {
        dispatch(
          updateAgent({
            id: response?.data?.agent?.id,
            changes: response?.data?.agent,
          })
        );
      }
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-row">
        {agent.invited == YES ? (
          <AgentInviteStatus />
        ) : (
          <Popover
            trigger={<AgentAwayStatus away={AGENT_AWAY_STATUS[agent.away]} />}
            content={
              <div className="hv-user-account-container w-[180px]">
                <ul className="m-0 pt-[6px] pb-[6px] pr-0 pl-0">
                  <li
                    onClick={() => {
                      changeAgentAwayStatus(AGENT_AWAY_DISABLE);
                    }}
                    className="gap-2 mt-0 mb-0 mr-[8px] ml-[8px] flex items-center hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer"
                  >
                    <a
                      type="button"
                      className="text-hv-color-13  text-[13px] relative"
                    >
                      {AGENT_AWAY_STATUS[AGENT_AWAY_DISABLE].label}
                    </a>
                  </li>

                  <li
                    onClick={() => {
                      changeAgentAwayStatus(AGENT_AWAY_ENABLE);
                    }}
                    className=" gap-2 mt-0 mb-0 mr-[8px] ml-[8px] flex items-center hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer"
                  >
                    <a
                      type="button"
                      className="text-hv-color-13   text-[13px] relative "
                    >
                      {AGENT_AWAY_STATUS[AGENT_AWAY_ENABLE].label}
                    </a>
                  </li>
                </ul>
              </div>
            }
          />
        )}
      </div>
    </React.Fragment>
  );
};
