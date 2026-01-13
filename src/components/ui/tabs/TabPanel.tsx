/**
 * ┌─────────────────────────────────────────────────────────┐
 * │  ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗       │
 * │  ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗      │
 * │  ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝      │
 * │  ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗      │
 * │  ██║  ██║███████╗███████╗██║     ███████╗██║  ██║      │
 * │  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝      │
 * │                     VIA                                  │
 * ├─────────────────────────────────────────────────────────┤
 * │  Developer: Yaşar Demirtaş                              │
 * │  Email: ydemirtas1745@gmail.com                         │
 * │  Component: TabPanel                                    │
 * └─────────────────────────────────────────────────────────┘
 */

import React from "react";
import { TabPanelProps } from "./types";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ").trim();
};

export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  activeValue,
  children,
  className = "",
}) => {
  const isActive = value === activeValue;

  if (!isActive) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      className={cn("flex-1 flex flex-col overflow-hidden h-full ", className)}
    >
      {children}
    </div>
  );
};

export default TabPanel;
