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
 * │  Component: Desktop Navbar                              │
 * └─────────────────────────────────────────────────────────┘
 */

import React from "react";
import { DesktopNavbarProps } from "./types";
import { cn } from "./utils";

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  activeItem,
  desktopItems,
  currentCompany,
  userStatus,
  userName,
  userAvatar,
  onItemClick,
  onCompanyClick,
}) => {
  return (
    <nav className="hidden md:flex left-0 top-0 h-screen w-16 bg-secondary-500 flex-col items-center border-r border-secondary-600 z-50 helpervia-navbar-desktop">
      {/* Company Section */}
      <div
        onClick={onCompanyClick}
        className="w-full py-4 flex flex-col items-center border-b border-secondary-600 cursor-pointer hover:bg-secondary-600 transition-colors group"
      >
        <div className="company-selector">
          <div className="circular-fan">
            <div className="stack-item"></div>
            <div className="stack-item"></div>
            <div className="company-avatar">{currentCompany.initials}</div>
          </div>
          <div className="company-name">{currentCompany.name}</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 w-full py-5 flex flex-col gap-2 overflow-y-auto">
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 4px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `}</style>
        {desktopItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={cn(
              "relative w-full flex flex-col items-center py-3 cursor-pointer transition-all helpervia-navbar-item",
              "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:transition-all before:duration-200",
              activeItem === item.id
                ? "bg-secondary-600 text-white before:bg-secondary-300"
                : "text-secondary-200 hover:bg-secondary-600 hover:text-white before:bg-transparent"
            )}
          >
            <div
              className={cn(
                "w-6 h-6 mb-1.5",
                activeItem === item.id ? "opacity-100" : "opacity-70"
              )}
            >
              {item.icon}
            </div>
            <div className="text-[11px] font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="w-full py-4 flex flex-col items-center border-t border-secondary-600 cursor-pointer hover:bg-secondary-600 transition-colors group">
        <div className="relative">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName}
              className="w-9 h-9 rounded-full border-2 border-secondary-600 group-hover:border-secondary-500 transition-colors"
            />
          ) : (
            <div className="w-9 h-9 bg-secondary-400 rounded-full flex items-center justify-center border-2 border-secondary-600 group-hover:border-secondary-500 transition-colors">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="text-secondary-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
          {userStatus === "online" && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-secondary-500 animate-pulse" />
          )}
        </div>
      </div>
    </nav>
  );
};
