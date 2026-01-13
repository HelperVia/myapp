import React, { useState } from "react";

import { ModalContext } from "@components/ui/modal/context/Context";
import { ChangeChatLimit } from "@pages/(profile)/my/team/modal/change-chat-limit";
import { AgentType } from "@/types/team/agent/agent.type";

import { YES } from "@/shared/constants/YesNo";
import Button from "@/components/ui/Button";
export const ChangeChatLimitAction = ({ agent }: { agent: AgentType }) => {
  const [closePopover, setClosePopover] = useState(true);

  const { setModal } = React.use(ModalContext);
  const changeChatLimitModal = () => {
    setClosePopover(!closePopover);

    setModal({
      open: true,
      footer: false,
      size: "xs",
      close: false,
      fullScreen: false,
      title: false,
      content: <ChangeChatLimit agent={agent} />,
    });
  };
  return (
    agent.invited != YES && (
      <Button
        onClick={changeChatLimitModal}
        variant="ghost"
        fullWidth
        size="sm"
      >
        Change Chat Limit
      </Button>
    )
  );
};
