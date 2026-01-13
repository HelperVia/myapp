"use client";
import React from "react";

import { RightSidebar } from "@components/layout/sidebar/right-sidebar";
import { RightSidebarContext } from "@components/layout/context/right-sidebar-context";
import { useLayoutHeight } from "../hooks/box-height";

export const ContentAreaWrapper = (props: { children: React.ReactNode }) => {
  const { sidebar } = React.use(RightSidebarContext);
  const { containerHeight } = useLayoutHeight();
  return (
    <div
      style={{ height: containerHeight }}
      className={"w-full flex flex-1 flex-row h-full relative chat-layout "}
    >
      <div
        className={
          "content-middle chat w-full flex flex-col " +
          (sidebar ? "content-middle-hidden" : "")
        }
      >
        {props.children}
      </div>
      {sidebar && <RightSidebar />}
    </div>
  );
};
