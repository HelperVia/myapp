"use client";
import React, { useCallback, useRef } from "react";

import { useAppSelector } from "@store/hooks";
import { AgentCustomerRender } from "./gridDataRenderer/AgentCustomerRender";
import { AgentStatusRender } from "./gridDataRenderer/AgentStatusRender";
import { AgentActionsRender } from "./gridDataRenderer/AgentActionsRender";

import { InviteAgent as InviteAgentModal } from "../modal/invite-agent";
import { InviteAgent } from "@components/buttons/invite-agent";
import { ContentContext } from "@components/layout/content/context/ContentContext";
import { ModalContext } from "@components/ui/modal/context/Context";
import { InputAdornment, OutlinedInput, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { GridData } from "@components/ui/grid/grid-data";
import { AgentSidebar } from "@components/teams/agent-sidebar";
import { RightSidebarContext } from "@components/layout/content/context/RightSidebarContext";
export const Agents = (props) => {
  const agentState = useAppSelector((state) => state.agent);

  const { sidebar, setSidebar } = React.use(RightSidebarContext);
  const { pageFocused, setPageFocused } = React.use(ContentContext);
  const { modal, setModal } = React.use(ModalContext);
  const mobileColumnDefs = [
    {
      field: "agent_name",
      headerName: "Name",
      cellRenderer: AgentCustomerRender,
      flex: 3,
      sort: "asc",
    },
    {
      field: "id",
      headerName: "",
      cellRenderer: AgentActionsRender,
      headerClass: "ag-center-aligned-header",
      cellStyle: (params) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
  ];

  const webColumnDefs = [
    {
      field: "agent_name",
      headerName: "Name",
      cellRenderer: AgentCustomerRender,
      flex: 3,
      sort: "asc",
    },
    { field: "away", headerName: "Away", cellRenderer: AgentStatusRender },
    {
      field: "id",
      headerName: "",
      cellRenderer: AgentActionsRender,
      headerClass: "ag-center-aligned-header",
      cellStyle: (params) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
  ];
  const gridRef = useRef();

  const setSelectedAgents = (data) => {
    setSidebar({
      component: <AgentSidebar agent={data.id} />,
      className: "min-w-[300px] lg:min-w-[400px]",
      header: {
        title: "Details",
        close: true,
      },
    });
    setPageFocused("chat-right-focused");
  };
  const setInviteModal = () => {
    setModal({
      open: true,
      footer: false,
      title: "Invite new people to your team",
      content: <InviteAgentModal />,
    });
  };
  const gridDataResponsive = (gridApi) => {
    if (window.innerWidth <= 1000) {
      gridApi.api.setGridOption("columnDefs", mobileColumnDefs);
      gridApi.api.sizeColumnsToFit();
    } else {
      gridApi.api.setGridOption("columnDefs", webColumnDefs);
      gridApi.api.sizeColumnsToFit();
    }
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("agent-search-box").value
    );
  }, []);
  return (
    <React.Fragment>
      <div className="ag-theme-alpine agentGrid h-[calc(100vh_-_222px)] md:h-[calc(100vh_-_165px)]">
        <Grid container spacing={3} className="p-5">
          <Grid size={{ xs: 12, sm: 5 }}>
            <OutlinedInput
              size="small"
              id="agent-search-box"
              placeholder="Search Agent"
              fullWidth
              onInput={onFilterTextBoxChanged}
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Box sx={{ float: "right" }}>
              <InviteAgent onClick={() => setInviteModal()} />
            </Box>
          </Grid>
        </Grid>

        <GridData
          ref={gridRef}
          rowSelection={{
            mode: "singleRow",
            checkboxes: false,
            enableClickSelection: true,
          }}
          onGridReady={(gridApi) => {
            gridDataResponsive(gridApi);
            window.addEventListener("resize", function () {
              setTimeout(function () {
                gridDataResponsive(gridApi);
              });
            });
            if (window.innerWidth >= 800) {
              if (gridApi != null) {
                gridApi.api.forEachNode((node, index) => {
                  if (index === 0) {
                    setSelectedAgents(node.data);
                    node.setSelected(true);
                  }
                });
              }
            }
          }}
          defaultColDef={{
            editable: false,
            sortable: true,
            filter: false,
            resizable: false,
            flex: 1,
            autoHeight: true,
            suppressMovable: true,
          }}
          onRowClicked={(e) => setSelectedAgents(e.data)}
          gridOptions={{
            rowHeight: 89.2,
          }}
          rowData={agentState.agents}
        ></GridData>
      </div>
    </React.Fragment>
  );
};
