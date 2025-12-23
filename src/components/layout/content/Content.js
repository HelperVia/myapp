"use client";
import React, { useEffect, useState } from "react";

import { RightSidebarContext } from "./context/RightSidebarContext";
import { ContentContext } from "./context/ContentContext";
import { Main } from "./Main";
import { ActionDialog } from "@components/ui/actionDialog/ActionDialog";
import { useRouter } from "next/navigation";
import { ActionDialogContext } from "@components/ui/actionDialog/context/Context";

export const Content = (props) => {
  const [sidebar, setSidebar] = useState({});
  const [pageFocused, setPageFocused] = useState("chat-middle-focused");
  const { action, setAction } = React.use(ActionDialogContext);
  const navigate = useRouter();
  useEffect(() => {
    setAction({ open: false });
  }, [navigate]);
  return (
    <React.Fragment>
      <ContentContext.Provider value={{ pageFocused, setPageFocused }}>
        <RightSidebarContext.Provider value={{ sidebar, setSidebar }}>
          <div className="page-center relative w-full flex flex-1 flex-col">
            <Main>{props.children}</Main>
            <ActionDialog />
          </div>
        </RightSidebarContext.Provider>
      </ContentContext.Provider>
    </React.Fragment>
  );
};
