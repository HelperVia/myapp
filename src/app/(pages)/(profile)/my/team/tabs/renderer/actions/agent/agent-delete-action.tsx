"use client";
import React, { useState } from "react";
import { AGENT_ROLE_OWNER } from "@constants/Agent";
import { ModalContext } from "@components/ui/modal/context/Context";
import { ConfirmForm } from "@components/confirm-form";
import { Button } from "@mui/material";
import { apiFetch } from "@/lib/api/api.fetch";
import { NotifyContext } from "@components/ui/notification/context/Context";
import { AgentType } from "@/types/team/agent/agent.type";

import { YES } from "@/shared/constants/YesNo";
export const DeleteAgentAction = ({ agent }: { agent: AgentType }) => {
  const { setModal } = React.use(ModalContext);

  const { setNotify } = React.use(NotifyContext);
  const [removeLoading, setRemoveLoading] = useState(false);
  const deleteAction = async () => {
    setRemoveLoading(true);

    const response = await apiFetch(
      "api/team/agent/" + agent.id + "/delete",
      {
        method: "DELETE",
        body: {},
      },
      {
        loading: false,
      }
    );

    if (response?.ok) {
      setRemoveLoading(false);
      setNotify({
        open: true,
        severity: "success",
        message: agent.agent_name + " deleted",
      });
    }

    if (!response?.ok) {
      setRemoveLoading(false);

      setNotify({
        open: true,
        severity: "error",
        message: "agent could not be deleted",
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
          title={"'" + agent.agent_name + "' agent will be deleted"}
          confirmComponent={
            <Button
              loading={removeLoading}
              loadingPosition="start"
              variant="contained"
              color="error"
              onClick={deleteAction}
            >
              Delete
            </Button>
          }
          subtitle="The agent will be permanently deleted. Chat and other information belonging to the agent will not be deleted."
        />
      ),
    });
  };
  return (
    agent.role != AGENT_ROLE_OWNER &&
    agent.invited != YES && (
      <li
        onClick={confirm}
        className="gap-2 mt-0 mb-0 mr-[8px] ml-[8px] flex items-center hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer"
      >
        <span className="text-hv-color-13  rounded-[8px] text-[13px] relative  ">
          Delete
        </span>
      </li>
    )
  );
};
