import React, { useState } from "react";
import HvPopoverContent from "@components/ui/popover/popover-content";
import HvPopoperTrigger from "@components/ui/popover/popover-trigger";
import HvPopover from "@components/ui/popover/popover";
import { AGENT_AWAY_ENABLE, AGENT_AWAY_DISABLE } from "@constants/Agent";
import { useAppDispatch } from "@store/hooks";

import { AgentInviteStatus } from "./AgentInviteStatus";
import { YES } from "@shared/constants/YesNo";
import { ApiResponse } from "@shared/lib/api/response/api.response.client";

export const AgentStatusRender = (props) => {
  const dispatch = useAppDispatch();
  const awayStatus = [];
  awayStatus[AGENT_AWAY_DISABLE] = "Accepting Chats";
  awayStatus[AGENT_AWAY_ENABLE] = "No accepting Chats";
  const [closePopover, setClosePopover] = useState(true);
  const changeAgentAwayStatus = async (new_status) => {
    setClosePopover(!closePopover);
    if (new_status != props.data.away) {
      const response = await fetch(
        "/api/team/agent/" + props.data.id + "/update",
        {
          method: "POST",
          body: JSON.stringify({
            away: new_status,
          }),
        }
      );
      const data = await ApiResponse(response);

      if (data?.ok) {
        dispatch({
          type: "UPDATE_AGENT",
          data: {
            id: data?.data?.id,
            update: [{ key: "away", val: new_status }],
          },
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-row">
        {props.data.invited == YES ? (
          <AgentInviteStatus invite={props.data.invited} />
        ) : (
          <HvPopover>
            <HvPopoverContent close={closePopover}>
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
                      {awayStatus[AGENT_AWAY_DISABLE]}
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
                      {awayStatus[AGENT_AWAY_ENABLE]}
                    </a>
                  </li>
                </ul>
              </div>
            </HvPopoverContent>
            <HvPopoperTrigger arrow={true}>
              {awayStatus[props.data.away]}
            </HvPopoperTrigger>
          </HvPopover>
        )}
      </div>
    </React.Fragment>
  );
};
