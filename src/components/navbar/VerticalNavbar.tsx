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
 * │  Component: Vertical Navbar (Main)                      │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { useState } from "react";
import "@public/companySelector.css";
import { VerticalNavbarProps } from "./types";
import { defaultMenuItems } from "./defaultMenuItems";
import { CompanySelectorModal } from "./CompanySelectorModal";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import { useDeviceDetect } from "@shared/hooks/use-device-detect";
export const VerticalNavbar: React.FC<VerticalNavbarProps> = ({
  activeItem = "chats",
  onItemClick,
  menuItems = defaultMenuItems,
  currentCompany = { id: "1", name: "Acme Corp", initials: "AC" },
  companies = [
    { id: "1", name: "Acme Corp", initials: "AC" },
    { id: "2", name: "TechStart Inc", initials: "TS" },
    { id: "3", name: "Global Solutions", initials: "GS" },
  ],
  onCompanySelect,
  userStatus = "online",
  userName = "User",
  userAvatar,
}) => {
  const [active, setActive] = useState(activeItem);
  const [isCompanySelectorOpen, setIsCompanySelectorOpen] = useState(false);
  const { isMobile } = useDeviceDetect();
  const handleItemClick = (itemId: string) => {
    setActive(itemId);
    onItemClick?.(itemId);
  };

  const handleCompanySelect = (company: {
    id: string;
    name: string;
    initials: string;
  }) => {
    onCompanySelect?.(company);
  };

  // Filter items by device
  const desktopItems = menuItems.filter((item) => item.showOnDesktop !== false);
  const mobileItems = menuItems.filter((item) => item.showOnMobile !== false);

  return (
    <>
      {/* Desktop Navbar */}
      {!isMobile && (
        <DesktopNavbar
          activeItem={active}
          desktopItems={desktopItems}
          currentCompany={currentCompany}
          userStatus={userStatus}
          userName={userName}
          userAvatar={userAvatar}
          onItemClick={handleItemClick}
          onCompanyClick={() => setIsCompanySelectorOpen(true)}
        />
      )}

      {/* Mobile Navbar */}
      {isMobile && (
        <MobileNavbar
          activeItem={active}
          mobileItems={mobileItems}
          currentCompany={currentCompany}
          onItemClick={handleItemClick}
          onCompanyClick={() => setIsCompanySelectorOpen(true)}
        />
      )}

      {/* Company Selector Modal */}
      <CompanySelectorModal
        isOpen={isCompanySelectorOpen}
        onClose={() => setIsCompanySelectorOpen(false)}
        companies={companies}
        currentCompany={currentCompany}
        onSelect={handleCompanySelect}
      />
    </>
  );
};

export default VerticalNavbar;
