import {
  AgentAwayStatusChildType,
  AgentAwayStatusType,
} from "@/types/team/agent";

import { Badge } from "@components/ui/badge";

export const AgentAwayStatus = ({
  away,
}: {
  away: AgentAwayStatusChildType;
}) => {
  return (
    <Badge variant={away.value ? "success" : "warning"} showDot>
      {away.label}
    </Badge>
  );
};
