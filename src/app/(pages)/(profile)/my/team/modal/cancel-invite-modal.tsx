import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ModalContext } from "@/components/ui/modal/context/Context";
import { AgentType } from "@/types/team/agent/agent.type";
import { apiFetch } from "@/lib/api/api.fetch";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteAgent } from "@/store/agent/agent.slice";
import { NotifyContext } from "@/components/ui/notification/context/Context";

export const CancelInviteModal = ({ agent }: { agent: AgentType }) => {
  const { setModal } = React.useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { notify, setNotify } = React.use(NotifyContext);
  const close = () => {
    setModal({
      open: false,
    });
  };
  const apply = async () => {
    setLoading(true);
    const response = await apiFetch(
      "/api/team/agent/" + agent.id + "/invite-cancel",
      {
        method: "DELETE",
        body: {},
      },
      {
        loading: false,
      }
    );

    if (response?.ok) {
      setNotify({
        open: true,
        severity: "success",
        message: "The agent’s invitation has been canceled.",
      });
      dispatch(deleteAgent(agent.id));
      close();
    }

    if (!response?.ok) {
      setNotify({
        open: true,
        severity: "error",
        message:
          "We could not cancel the agent’s invitation at this time. Please try again later.",
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <span>
        Are you sure you want to cancel the invite for{" "}
        <strong>{agent.agent_name}</strong>? The invitee will no longer be able
        to accept this invitation.
      </span>
      <div className="flex flex-row justify-end  gap-6 ">
        <Button disabled={loading} onClick={close} color="error" variant="text">
          No, go back
        </Button>
        <Button
          loading={loading}
          loadingPosition="start"
          onClick={apply}
          color="brandGrey"
          variant="contained"
        >
          Yes, cancel
        </Button>
      </div>
    </div>
  );
};
