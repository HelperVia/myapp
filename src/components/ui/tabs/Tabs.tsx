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
 * │  Component: Tabs                                        │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { useState, useCallback } from "react";
import { TabsProps } from "./types";
import { Tab } from "./Tab";
import { TabPanel } from "./TabPanel";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ").trim();
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = "default",
  size = "md",
  fullWidth = false,
  className = "",
  tabClassName = "",
  contentClassName = "",
}) => {
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue || tabs[0]?.value || ""
  );

  // Use controlled value if provided, otherwise use internal state
  const activeValue = isControlled ? controlledValue : internalValue;

  // Handle tab change
  const handleTabChange = useCallback(
    (newValue: string) => {
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Call onChange callback if provided
      if (onChange) {
        onChange(newValue);
      }
    },
    [isControlled, onChange]
  );

  // Find active tab for indicator positioning
  const activeTabIndex = tabs.findIndex((tab) => tab.value === activeValue);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Tab List */}
      <div
        className={cn(
          "flex-shrink-0 border-b border-gray-300 px-5",
          variant === "pills" && "border-b-0 p-1 bg-gray-100 rounded-lg"
        )}
      >
        <div
          role="tablist"
          className={cn(
            "flex",
            fullWidth ? "w-full" : "inline-flex",
            variant === "pills" && "gap-1"
          )}
        >
          {tabs.map((tab, index) => (
            <div
              key={tab.value}
              className={cn(
                fullWidth && "flex-1",
                variant === "pills" && "flex-shrink-0"
              )}
            >
              <Tab
                value={tab.value}
                label={tab.label}
                icon={tab.icon}
                disabled={tab.disabled}
                badge={tab.badge}
                active={tab.value === activeValue}
                onClick={() => handleTabChange(tab.value)}
                variant={variant}
                size={size}
                className={cn(fullWidth && "w-full", tabClassName)}
              />
            </div>
          ))}
        </div>

        {/* Indicator for default variant */}
        {variant === "default" && activeTabIndex >= 0 && (
          <div
            className="h-0.5 bg-primary-500 transition-all duration-300"
            style={{
              width: fullWidth ? `${100 / tabs.length}%` : "auto",
              transform: fullWidth
                ? `translateX(${activeTabIndex * 100}%)`
                : undefined,
            }}
          />
        )}
      </div>

      {/* Tab Panels */}
      <div className={cn("flex-1 overflow-hidden", contentClassName)}>
        {tabs.map((tab) => (
          <TabPanel key={tab.value} value={tab.value} activeValue={activeValue}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
