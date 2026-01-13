import { TextField } from "@/components/ui/forms";
import { InviteAgentButton } from "@/components/buttons/InviteAgentButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InviteAgent } from "../../../modal/InviteAgent";
import React from "react";
import { ModalContext } from "@components/ui/modal/context/Context";

export const AgentHeader = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { setModal } = React.use(ModalContext);
  const setInviteModal = () => {
    setModal({
      open: true,
      footer: false,
      title: "Invite new people to your team",
      content: <InviteAgent />,
    });
  };
  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-200 px-5 ">
      <div className="flex flex-col sm:flex-row gap-3 py-5">
        {/* Search Input */}
        <div className="w-full sm:w-5/12">
          <TextField
            name="agent"
            placeholder="Search Agent"
            size="small"
            startAdornment={<SearchOutlinedIcon />}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Invite Button */}
        <div className="w-full sm:w-7/12 flex justify-start sm:justify-end items-center">
          <InviteAgentButton onClick={() => setInviteModal()} />
        </div>
      </div>
    </div>
  );
};
