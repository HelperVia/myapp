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
 * │  Component: Navbar Exports                              │
 * └─────────────────────────────────────────────────────────┘
 */

// Main component
export { VerticalNavbar } from "./VerticalNavbar";
export { default } from "./VerticalNavbar";

// Sub-components
export { CompanySelectorModal } from "./CompanySelectorModal";
export { DesktopNavbar } from "./DesktopNavbar";
export { MobileNavbar } from "./MobileNavbar";

// Types
export type {
  NavItem,
  Company,
  VerticalNavbarProps,
  CompanySelectorModalProps,
  DesktopNavbarProps,
  MobileNavbarProps,
} from "./types";

// Utils
export { cn } from "./utils";

// Default items
export { defaultMenuItems } from "./defaultMenuItems";
