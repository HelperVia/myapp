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
 * │  Component: Popover Types                               │
 * └─────────────────────────────────────────────────────────┘
 */

import { ReactNode } from "react";

export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface PopoverProps {
  // Trigger element
  trigger: ReactNode;

  // Content
  content: ReactNode;

  // Placement
  placement?: PopoverPlacement;

  // Arrow
  arrow?: boolean;

  // Close options
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;

  // Scroll
  scrollable?: boolean;
  maxHeight?: string | number;

  // State control
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Offset
  offset?: number;

  // Styling
  className?: string;
  contentClassName?: string;

  // Portal
  appendTo?: HTMLElement | "body";
}

export interface PopoverContentProps {
  children: ReactNode;
  placement: PopoverPlacement;
  arrow: boolean;
  scrollable: boolean;
  maxHeight?: string | number;
  showCloseButton: boolean;
  onClose: () => void;
  className?: string;
}
