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
 * │  Component: Mobile Navbar                               │
 * └─────────────────────────────────────────────────────────┘
 */

import React from "react";
import { MobileNavbarProps } from "./types";
import { cn } from "./utils";

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  activeItem,
  mobileItems,
  currentCompany,
  onItemClick,
  onCompanyClick,
}) => {
  return (
    <nav className="order-2 bottom-0 left-0 right-0 h-16 bg-secondary-500 flex items-center justify-around border-t border-secondary-600 z-50 helpervia-navbar-mobile">
      {/* Company Selector (Mobile) */}
      <div
        onClick={onCompanyClick}
        className="flex flex-col items-center py-2 cursor-pointer transition-transform active:scale-95"
      >
        <div className="relative">
          <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center font-semibold text-white text-xs">
            {currentCompany.initials}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-secondary-500" />
        </div>
        <div className="text-[9px] text-secondary-200 mt-0.5 font-medium">
          Company
        </div>
      </div>

      {/* Mobile Menu Items */}
      {mobileItems.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={cn(
            "flex flex-col items-center py-2 cursor-pointer transition-all relative active:scale-95",
            activeItem === item.id ? "text-white" : "text-secondary-200"
          )}
        >
          {/* Active indicator - top bar */}
          {activeItem === item.id && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-secondary-300 rounded-b-full" />
          )}
          <div
            className={cn(
              "w-6 h-6",
              activeItem === item.id ? "opacity-100" : "opacity-70"
            )}
          >
            {item.icon}
          </div>
          <div className="text-[9px] font-medium mt-0.5">{item.label}</div>
        </div>
      ))}
    </nav>
  );
};
