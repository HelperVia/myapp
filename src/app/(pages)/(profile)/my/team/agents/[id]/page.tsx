"use client";
import { Box as LayoutBox } from "@components/layout/Box";
import { AgentDetail } from "./AgentDetail";

export default function page() {
  return (
    <LayoutBox
      header={{
        title: "Agent Details",
        navigate: {
          href: "/my/team/agents",
        },
      }}
    >
      <AgentDetail />
    </LayoutBox>
  );
}
