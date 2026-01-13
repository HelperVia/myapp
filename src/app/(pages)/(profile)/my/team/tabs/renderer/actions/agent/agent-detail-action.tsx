"use client";

import Link from "next/link";
import { AgentType } from "@/types/team/agent/agent.type";
import { YES } from "@/shared/constants/YesNo";
import Button from "@/components/ui/Button";
export const AgentDetailAction = ({ agent }: { agent: AgentType }) => {
  if (agent.invited === YES) {
    return null;
  }
  return (
    <Link href={"/my/team/agents/" + agent.id}>
      <Button variant="ghost" fullWidth size="md">
        Edit Agent
      </Button>
    </Link>
  );
};
