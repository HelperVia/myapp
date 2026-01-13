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
 * │  Component: Navbar Types                                │
 * └─────────────────────────────────────────────────────────┘
 */

import { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

export interface Company {
  id: string;
  name: string;
  initials: string;
}

export interface VerticalNavbarProps {
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  menuItems?: NavItem[];
  currentCompany?: Company;
  companies?: Company[];
  onCompanySelect?: (company: Company) => void;
  userStatus?: "online" | "offline";
  userName?: string;
  userAvatar?: string;
}

export interface CompanySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
  currentCompany?: Company;
  onSelect: (company: Company) => void;
}

export interface DesktopNavbarProps {
  activeItem: string;
  desktopItems: NavItem[];
  currentCompany: Company;
  userStatus: "online" | "offline";
  userName: string;
  userAvatar?: string;
  onItemClick: (itemId: string) => void;
  onCompanyClick: () => void;
}

export interface MobileNavbarProps {
  activeItem: string;
  mobileItems: NavItem[];
  currentCompany: Company;
  onItemClick: (itemId: string) => void;
  onCompanyClick: () => void;
}
