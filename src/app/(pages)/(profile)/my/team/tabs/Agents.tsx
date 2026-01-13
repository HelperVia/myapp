"use client";
import React, { ChangeEvent, useState } from "react";

import { useAppSelector } from "@store/hooks";

import { AgentList } from "./renderer/agent/list/List";

import { AgentHeader } from "./renderer/agent/AgentHeader";
import { selectAllAgents } from "@/store/agent/agent.selectors";

export const Agents = () => {
  const agents = useAppSelector(selectAllAgents);
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="bg-gray-50 flex-1 flex flex-col overflow-hidden">
      <AgentHeader onChange={onChange} />
      <AgentList agents={agents} searchValue={searchValue} />
    </div>
  );
};
