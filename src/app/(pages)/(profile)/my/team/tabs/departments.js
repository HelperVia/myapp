"use client";
import React, { useCallback, useRef } from "react";

import { useAppSelector } from "@store/hooks";
import { ContentContext } from "@components/layout/content/context/ContentContext";
import { ModalContext } from "@components/ui/modal/context/Context";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { DepartmentNameRender } from "./gridDataRenderer/DepartmentNameRender";
import { DepartmentActionsRender } from "./gridDataRenderer/DepartmentActionsRender";
import { DepartmentMembersRender } from "./gridDataRenderer/DepartmentMembersRender";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { NewDepartment } from "../modal/new-department";
import { GridData } from "@components/ui/grid/grid-data";
import { DepartmentSidebar } from "@components/teams/department-sidebar";
import { RightSidebarContext } from "@components/layout/content/context/RightSidebarContext";

export const Departments = (props) => {
  const chatprop = useAppSelector((state) => state.app);

  const { sidebar, setSidebar } = React.use(RightSidebarContext);
  const { pageFocused, setPageFocused } = React.use(ContentContext);
  const { modal, setModal } = React.use(ModalContext);
  const mobileColumnDefs = [
    {
      field: "department",
      headerName: "Name",
      cellRenderer: DepartmentNameRender,
      flex: 1,
    },
    {
      field: "agents",
      headerName: "",
      cellRenderer: DepartmentActionsRender,
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
      field: "department",
      headerName: "Name",
      cellRenderer: DepartmentNameRender,
      flex: 1,
    },
    {
      field: "agents",
      headerName: "Agents",
      cellRenderer: DepartmentMembersRender,
    },
    {
      field: "id",
      headerName: "",
      cellRenderer: DepartmentActionsRender,
      headerClass: "ag-center-aligned-header",
      cellStyle: (params) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }),
    },
  ];
  const gridRef = useRef();

  const setSelectSidebar = (data) => {
    setSidebar({
      component: <DepartmentSidebar department={data.id} />,
      className: "min-w-[300px] lg:min-w-[400px]",
      header: {
        title: "Details",
        close: true,
      },
    });
    setPageFocused("chat-right-focused");
  };
  const setNewDepartmentModal = () => {
    setModal({
      open: true,
      footer: false,
      size: "sm",
      title: "Create a new department",
      content: <NewDepartment />,
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

  return (
    <React.Fragment>
      <div className="ag-theme-alpine agentGrid h-[calc(100vh_-_222px)] md:h-[calc(100vh_-_165px)]">
        <Grid container spacing={3} className="p-5">
          <Grid size={{ xs: 12, sm: 12 }}>
            <Box sx={{ float: "right" }}>
              <Button
                onClick={setNewDepartmentModal}
                color="grey"
                component="label"
                variant="outlined"
                startIcon={<AddIcon />}
              >
                New Department
              </Button>
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
                    setSelectSidebar(node.data);
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
            cellFocused: false,
            suppressMovable: true,
          }}
          onRowClicked={(e) => setSelectSidebar(e.data)}
          gridOptions={{
            rowHeight: 70,
          }}
          rowData={chatprop.departments}
        ></GridData>
      </div>
    </React.Fragment>
  );
};
