import React from "react";

export const AgentInviteStatus = ({ invite }) => {
  return (
    <React.Fragment>
      {invite === true && <span>Invite sent</span>}
    </React.Fragment>
  );
};
