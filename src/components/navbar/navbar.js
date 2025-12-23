"use client";
import React, { Component } from "react";

import HvPopover from "@components/ui/popover/popover";
import HvPopoverContent from "@components/ui/popover/popover-content";
import HvPopoperTrigger from "@components/ui/popover/popover-trigger";
import { grey } from "@mui/material/colors";
import MediaQuery from "react-responsive";
import { NavbarItem } from "./navbar-item";
import { Avatar } from "@mui/material";
import { UserPopover } from "../users/user-popover";
import { UserAvatar } from "../users/avatar";

export const Navbar = (props) => {
  const menuItem = {
    chat: [
      {
        icon: "nav-chat",
        name: "Chats",
        href: "chat",
        mobile: true,
      },
    ],
    traffic: [
      {
        icon: "nav-traffic",
        name: "Traffic",
        href: "traffic",
        mobile: true,
      },
    ],
    agent: [
      {
        icon: "nav-user",
        name: "Agents",
        href: "my/team/agents",
        mobile: true,
      },
    ],
    archive: [
      {
        icon: "nav-archive",
        name: "Archives",
        href: "archive",
        mobile: false,
      },
    ],
    settings: [
      {
        icon: "nav-setting",
        name: "Settings",
        href: "settings/website",
        mobile: true,
      },
    ],
  };

  return (
    <React.Fragment>
      <nav
        cid="sidebar-menu"
        className="z-[99999] p-[6px] chat-menus flex flex-row md:flex-col items-center justify-around md:justify-between w-[100%] md:!w-[78px] order-last  md:order-first left-0 top-0  pt-[6px] pb-[6px] h-[60px] md:h-[100%] bg-hv-color-24 border-solid border-r-1 border-hv-color-14  shadow-sidebar"
      >
        <ul className="flex flex-row md:flex-col navigation-scrollable gap-0 md:gap-[4px] w-[100%] md:w-full justify-around">
          {menuItem &&
            Object.keys(menuItem).map((key, menu) => {
              if (!menuItem[key][0].mobile) {
                return (
                  <MediaQuery key={menu} minDeviceWidth={768}>
                    <NavbarItem
                      menuKey={key}
                      menu={menu}
                      key={menu}
                      menuItem={menuItem}
                    />
                  </MediaQuery>
                );
              } else {
                return (
                  <NavbarItem
                    menuKey={key}
                    menu={menu}
                    key={menu}
                    menuItem={menuItem}
                  />
                );
              }
            })}
          <MediaQuery maxDeviceWidth={768}>
            <li>
              <Avatar sx={{ bgcolor: grey[800] }} variant="square">
                {" "}
                Yaşar Demirtaş
              </Avatar>
            </li>
          </MediaQuery>
        </ul>
        <MediaQuery minDeviceWidth={768}>
          <ul className="chat-menus flex  flex-col items-center">
            <li
              className={
                "p-[5px] md:p-0 sidebar-menu text-hv-color-18 cursor-pointer "
              }
            >
              <HvPopover>
                <HvPopoverContent>
                  <UserPopover />
                </HvPopoverContent>
                <HvPopoperTrigger>
                  <UserAvatar />
                </HvPopoperTrigger>
              </HvPopover>
            </li>
          </ul>
        </MediaQuery>
      </nav>
    </React.Fragment>
  );
};
