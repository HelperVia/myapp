import React from "react";

import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Link from "next/link";
import { RightSidebarContext } from "./context/right-sidebar-context";

export interface HeaderType {
  close?: boolean;
  title?: string;
  component?: any;
  navigate?: {
    href: string;
    title?: string;
  };
}
export const Header = ({ header }: { header: HeaderType }) => {
  const { setSidebar } = React.use(RightSidebarContext);

  return (
    <div className="chat-header flex items-center justify-between">
      <div className="flex-1 flex justify-start">
        {header?.navigate && (
          <Link
            href={header.navigate.href}
            className="header-name flex items-center"
          >
            <ArrowBackIosOutlinedIcon sx={{ fontSize: "12px" }} />
            {header.navigate.title ?? "Back"}
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-center">
        {header.title && <span className="header-name">{header.title}</span>}
        {header.component && header.component}
      </div>

      <div className="flex-1 flex justify-end">
        {header.close && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSidebar(null);
            }}
          >
            <svg
              width="20px"
              height="20px"
              fill="#1C274C"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ClearIcon"
            >
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};
