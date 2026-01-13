import React from "react";
import { RightSidebarContext } from "@components/layout/context/right-sidebar-context";
import { Box } from "@components/layout/Box";
import { Section } from "@/components/ui/section";

export const RightSidebar = () => {
  const { sidebar } = React.use(RightSidebarContext);

  return (
    <React.Fragment>
      {sidebar.component && (
        <Section
          className={
            (sidebar.className ? sidebar.className : " !min-w-[320px]") +
            " right-sidebar !p-0"
          }
        >
          <Box header={sidebar.header ? sidebar.header : ""}>
            <div className="right-sidebar-wrap active">{sidebar.component}</div>
          </Box>
        </Section>
      )}
    </React.Fragment>
  );
};
