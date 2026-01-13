"use client";
import React, { useEffect } from "react";

import { TabItem, Tabs } from "@/components/ui/tabs";

import { usePathname, useRouter } from "next/navigation";
import { Agents } from "./tabs/Agents";
import { Departments } from "./tabs/Departments";
import { Box as LayoutBox } from "@components/layout/Box";

import { useAppDispatch } from "@store/hooks";

export const Team = () => {
  const pathname = usePathname();

  const tabs: TabItem[] = [
    {
      value: "agents",
      label: "Agents",
      content: <Agents />,
    },
    {
      value: "departments",
      label: "Departments",
      content: <Departments />,
    },
  ];
  const [value, setValue] = React.useState(pathname.replace(/\/$/, ""));

  const handleChange = (value: any) => {
    value = value.replace(/\/$/, "");
    window.history.replaceState(null, "", value);

    setValue(value);
  };

  return (
    <React.Fragment>
      <LayoutBox>
        <Tabs
          variant="underline"
          tabs={tabs}
          onChange={handleChange}
          defaultValue="agents"
        />
      </LayoutBox>
    </React.Fragment>
  );
};
