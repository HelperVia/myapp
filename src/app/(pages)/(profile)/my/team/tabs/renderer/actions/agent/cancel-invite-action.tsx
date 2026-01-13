import React from "react";
import { ModalContext } from "@/components/ui/modal/context/Context";
import { YES } from "@/shared/constants/YesNo";
import { AgentType } from "@/types/team/agent/agent.type";
import { CancelInviteModal } from "@pages/(profile)/my/team/modal/cancel-invite-modal";

export const CancelInviteAction = ({ agent }: { agent: AgentType }) => {
  const { setModal } = React.useContext(ModalContext);

  const cancelInviteModal = () => {
    setModal({
      open: true,
      footer: true,
      size: "xs",
      close: false,
      fullScreen: false,
      title: false,
      content: <CancelInviteModal agent={agent} />,
    });
  };
  return (
    agent.invited === YES && (
      <li
        onClick={cancelInviteModal}
        className="gap-2 mt-0 mb-0 mr-[8px] ml-[8px] flex items-center hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer"
      >
        <span className="text-hv-color-13  rounded-[8px] text-[13px] relative  ">
          Cancel Invite
        </span>
      </li>
    )
  );
};
