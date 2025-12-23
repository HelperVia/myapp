"use client";
import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";
import { Agents } from "./tabs/agents";
import { Departments } from "./tabs/departments";
import { Box as LayoutBox } from "@components/layout/Box";

import { useAppDispatch } from "@store/hooks";

function CustomTabPanel(props) {
  let { children, value, index, ...other } = props;

  value = value.replace(/\/$/, "");

  return (
    <div
      role="agent-tab-panel"
      hidden={value !== index}
      id={`agent-tab-panel-${index}`}
      aria-labelledby={`agent-tab-${index}`}
      {...other}
    >
      {(value === index || value === index + "/") && <Box>{children}</Box>}
    </div>
  );
}

export const Team = (props) => {
  const pathname = usePathname();
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState(pathname.replace(/\/$/, ""));

  const tabs = [
    {
      label: "Agents",
      url: "/my/team/agents",
    },
    {
      label: "Departments",
      url: "/my/team/departments",
    },
  ];

  const handleChange = (event, newValue) => {
    newValue = newValue.replace(/\/$/, "");
    window.history.replaceState(null, "", newValue);

    setValue(newValue);
  };

  return (
    <React.Fragment>
      <LayoutBox
        header={{
          title: tabs.find((t) => t.url == value).label,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="px-[15px]"
          >
            <Tabs value={value} onChange={handleChange} aria-label="agent tabs">
              {tabs.map((i, key) => {
                return (
                  <Tab
                    key={key}
                    label={i.label}
                    value={i.url}
                    sx={{ textTransform: "none" }}
                  />
                );
              })}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={"/my/team/agents"}>
            <Agents />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={"/my/team/departments"}>
            <Departments />
          </CustomTabPanel>
        </Box>
      </LayoutBox>
    </React.Fragment>
  );
};
