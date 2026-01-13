"use client";
import React, { useEffect, useState } from "react";

import { RightSidebarContext } from "../context/right-sidebar-context";
import { ContentAreaWrapper } from "@components/layout/content/wrapper";
import { ActionDialog } from "@components/ui/actionDialog/action-dialog";
import { ActionDialogContext } from "@components/ui/actionDialog/context/context";
import { usePathname } from "next/navigation";
export const ContentArea = (props: { children: React.ReactNode }) => {
  const [sidebar, setSidebar] = useState(null);
  const { setAction } = React.use(ActionDialogContext);

  const pathname = usePathname();

  useEffect(() => {
    setSidebar(null);
    setAction({ open: false });
  }, [pathname]);
  return (
    <RightSidebarContext.Provider value={{ sidebar, setSidebar }}>
      <ContentAreaWrapper>{props.children}</ContentAreaWrapper>
      <ActionDialog />
    </RightSidebarContext.Provider>
  );
};
