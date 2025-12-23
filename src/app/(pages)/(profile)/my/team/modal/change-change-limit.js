import React, { useState } from "react";
import Button from "@mui/material/Button";
import { InputNumber } from "@components/ui/inputNumber/input-number";
import { AgentUserCard } from "@components/teams/agent-user-card";
import Divider from "@mui/material/Divider";
import { ModalContext } from "@components/ui/modal/context/Context";
import { useDispatch } from "react-redux";
import { NotifyContext } from "@components/ui/notification/context/Context";
import { ApiResponse } from "@shared/lib/api/response/api.response.client";

export const ChangeChatLimit = (props) => {
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
      const response = await fetch(
        "/api/team/agent/" + props.agent.id + "/update",
        {
          method: "POST",
          body: JSON.stringify({
            chat_limit: value,
          }),
        }
      );
      setNotify({
        open: true,
        severity: "success",
        message: "Chat limit has changed for ",
      });
      const data = await ApiResponse(response);
      if (data?.ok) {
        setNotify({
          open: true,
          severity: "success",
          message: "Chat limit has changed for " + props.agent.agent_name,
        });

        dispatch({
          type: "UPDATE_AGENT",
          data: {
            id: data?.data?.id,
            update: [{ key: "chat_limit", val: value }],
          },
        });
      }

      if (!data?.ok) {
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
        <AgentUserCard agent={props.agent} roleShow={false} />
        <InputNumber value={value} onChange={setValue} min={1} max={50} />
      </div>
      <div className="flex flex-col gap-4">
        <Divider />
        <change-chat-limit-action className="flex flex-row justify-end  gap-6 ">
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
            color="grey"
            variant="contained"
          >
            Apply
          </Button>
        </change-chat-limit-action>
      </div>
    </div>
  );
};
