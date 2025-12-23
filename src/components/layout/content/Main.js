"use client";
import React, { useEffect, useState } from "react";

import { RightSidebar } from "@components/layout/sidebar/content/right/sidebar";
import { ContentContext } from "./context/ContentContext";

export const Main = (props) => {
  const { pageFocused } = React.use(ContentContext);

  return (
    <div
      className={
        "w-full flex flex-1 flex-row h-full relative chat-layout " + pageFocused
      }
    >
      <div className="chat-detail-container chat w-full flex flex-col">
        {props.children}
      </div>

      <RightSidebar />
    </div>
  );
};
