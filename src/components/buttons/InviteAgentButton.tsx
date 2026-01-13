import React from "react";
import Button from "@components/ui/Button";
import AddIcon from "@mui/icons-material/Add";

export const InviteAgentButton = (props: {
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <React.Fragment>
      <Button
        variant="secondary"
        onClick={props.onClick}
        disabled={props.disabled}
        leftIcon={<AddIcon />}
      >
        Invite Agent
      </Button>
    </React.Fragment>
  );
};
