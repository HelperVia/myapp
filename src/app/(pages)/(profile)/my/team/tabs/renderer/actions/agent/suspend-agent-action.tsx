"use client";
import React, { useState } from "react";
import {
  AGENT_ROLE_OWNER,
  AGENT_STATUS_ACTIVE,
  AGENT_STATUS_SUSPENDED,
} from "@constants/Agent";
import { ModalContext } from "@components/ui/modal/context/Context";
import { ConfirmForm } from "@components/confirm-form";
import { Button } from "@mui/material";
import { apiFetch } from "@/lib/api/api.fetch";
import { NotifyContext } from "@components/ui/notification/context/Context";
import { AgentType } from "@/types/team/agent/agent.type";

import { YES } from "@/shared/constants/YesNo";
import { useDispatch } from "react-redux";
import { updateAgent } from "@/store/agent/agent.slice";
export const SuspendAgentAction = ({ agent }: { agent: AgentType }) => {
  const dispatch = useDispatch();
  const { setModal } = React.use(ModalContext);

  const { setNotify } = React.use(NotifyContext);
  const [removeLoading, setRemoveLoading] = useState(false);
  const suspendToggleAction = async () => {
    setRemoveLoading(true);

    const response = await apiFetch<{ agent: AgentType }>(
      "api/team/agent/" + agent.id + "/suspend",
      {
        method: "POST",
        body: {},
      }
    );

    if (response?.ok) {
      dispatch(
        updateAgent({
          id: response?.data?.agent?.id,
          changes: response?.data?.agent,
        })
      );
      setRemoveLoading(false);
      setNotify({
        open: true,
        severity: "success",
        message:
          agent.agent_name +
          " " +
          (agent.status === AGENT_STATUS_ACTIVE ? "Suspend" : "Activate"),
      });
    } else {
      setRemoveLoading(false);

      setNotify({
        open: true,
        severity: "error",
        message:
          agent.status === AGENT_STATUS_ACTIVE
            ? "Agent could not be suspended"
            : "Agent could not be activated.",
      });
    }

    setModal({
      open: false,
    });
  };
  const confirm = () => {
    setModal({
      open: true,
      size: "xs",
      close: false,
      footer: false,
      content: (
        <ConfirmForm
          title={`'${agent.agent_name}' agent will be ${
            agent.status === AGENT_STATUS_ACTIVE ? "suspended" : "activated"
          }`}
          confirmComponent={
            <Button
              loading={removeLoading}
              loadingPosition="start"
              variant="contained"
              color={agent.status === AGENT_STATUS_ACTIVE ? "error" : "success"}
              onClick={suspendToggleAction}
            >
              {agent.status === AGENT_STATUS_ACTIVE ? "Suspend" : "Activate"}
            </Button>
          }
          subtitle={
            agent.status === AGENT_STATUS_ACTIVE
              ? "Should the agent be suspended? Its operations will be stopped."
              : "Do you want to activate the agent? Its operations will resume."
          }
        />
      ),
    });
  };

  if (
    agent.status !== AGENT_STATUS_ACTIVE &&
    agent.status !== AGENT_STATUS_SUSPENDED
  )
    return null;

  if (
    agent.role === AGENT_ROLE_OWNER ||
    agent.invited === YES ||
    ![AGENT_STATUS_ACTIVE, AGENT_STATUS_SUSPENDED].includes(agent.status)
  ) {
    return null;
  }

  return (
    <li
      onClick={confirm}
      className="gap-2 mr-[8px] ml-[8px] flex items-center hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] pt-[9px] pb-[9px] pl-[8px] pr-[8px] cursor-pointer"
    >
      <span className="text-hv-color-13 text-[13px]">
        {agent.status === AGENT_STATUS_ACTIVE ? "Suspend" : "Activate"}
      </span>
    </li>
  );
};
