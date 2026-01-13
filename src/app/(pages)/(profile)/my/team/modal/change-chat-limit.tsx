import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputNumber } from "@components/ui/forms";
import { AgentCard } from "@components/teams/index";
import Divider from "@mui/material/Divider";
import { ModalContext } from "@components/ui/modal/context/Context";
import { useDispatch } from "react-redux";
import { NotifyContext } from "@components/ui/notification/context/Context";

import { updateAgent } from "@/store/agent/agent.slice";
import { AgentType } from "@/types/team/agent/agent.type";
import { apiFetch } from "@/lib/api/api.fetch";

export const ChangeChatLimit = (props: { agent: AgentType }) => {
  const [value, setValue] = useState(props.agent.chat_limit);
  const [loading, setLoading] = useState(false);
  const { modal, setModal } = React.use(ModalContext);
  const { notify, setNotify } = React.use(NotifyContext);
  const dispatch = useDispatch();
  const closeChangeChatLimit = () => {
    setModal({
      open: false,
    });
  };

  const changeChatLimitApply = async () => {
    if (props.agent.chat_limit != value) {
      setLoading(true);
      const response = await apiFetch<{ agent: AgentType }>(
        "/api/team/agent/" + props.agent.id + "/update",
        {
          method: "POST",
          body: JSON.stringify({
            chat_limit: value,
          }),
        }
      );

      if (response?.ok) {
        setNotify({
          open: true,
          severity: "success",
          message: "Chat limit has changed for " + props.agent.agent_name,
        });

        if (response?.data?.agent) {
          dispatch(
            updateAgent({
              id: response?.data?.agent?.id,
              changes: response?.data?.agent,
            })
          );
        }
      } else {
        setNotify({
          open: true,
          severity: "error",
          message: "Could not change chat limit for " + props.agent.agent_name,
        });
      }

      closeChangeChatLimit();
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex flex-col sm:flex-row gap-8 justify-between">
        <AgentCard agent={props.agent} role={false} />
        <InputNumber
          size="small"
          value={value}
          min={1}
          max={99}
          onChange={setValue}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Divider />
        <div className="flex flex-row justify-end  gap-6 ">
          <Button
            disabled={loading}
            onClick={closeChangeChatLimit}
            color="error"
            variant="text"
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            loadingPosition="start"
            onClick={changeChatLimitApply}
            disabled={props.agent.chat_limit == value}
            color="brandGrey"
            variant="contained"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
