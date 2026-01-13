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
 * │  Component: Popover                                     │
 * └─────────────────────────────────────────────────────────┘
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import { PopoverProps, PopoverPlacement } from "./types";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ").trim();
};

export interface PopoverRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
}

export const Popover = forwardRef<PopoverRef, PopoverProps>(
  (
    {
      trigger,
      content,
      placement = "bottom",
      arrow = true,
      closeOnClickOutside = true,
      closeOnEscape = true,
      showCloseButton = false,
      scrollable = false,
      maxHeight,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      offset = 12,
      className = "",
      contentClassName = "",
      appendTo = "body",
    },
    ref
  ) => {
    // Controlled vs Uncontrolled
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Refs
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
      null
    );

    // Position state
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [actualPlacement, setActualPlacement] =
      useState<PopoverPlacement>(placement);
    const [arrowPosition, setArrowPosition] = useState<{
      top?: string;
      left?: string;
      right?: string;
      bottom?: string;
    }>({});
    const [isPositioned, setIsPositioned] = useState(false); // Track if position is calculated

    // Handle open/close
    const handleToggle = useCallback(
      (e?: React.MouseEvent) => {
        // Stop event propagation to prevent parent clicks (e.g., DataTable row clicks)
        if (e) {
          e.stopPropagation();
        }

        const newOpen = !isOpen;
        if (!isControlled) {
          setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [isOpen, isControlled, onOpenChange]
    );

    const handleClose = useCallback(() => {
      if (!isControlled) {
        setInternalOpen(false);
      }
      setIsPositioned(false); // Reset positioning flag
      onOpenChange?.(false);
    }, [isControlled, onOpenChange]);

    const handleOpen = useCallback(() => {
      if (!isControlled) {
        setInternalOpen(true);
      }
      onOpenChange?.(true);
    }, [isControlled, onOpenChange]);

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose,
        toggle: () => handleToggle(),
        isOpen,
      }),
      [handleOpen, handleClose, handleToggle, isOpen]
    );

    // Find scrollable parent
    const findScrollableParent = useCallback(
      (element: HTMLElement | null): HTMLElement | null => {
        if (!element) return null;

        let parent = element.parentElement;
        while (parent) {
          const { overflow, overflowY, overflowX } =
            window.getComputedStyle(parent);
          if (
            overflow === "auto" ||
            overflow === "scroll" ||
            overflowY === "auto" ||
            overflowY === "scroll" ||
            overflowX === "auto" ||
            overflowX === "scroll"
          ) {
            return parent;
          }
          parent = parent.parentElement;
        }
        return null;
      },
      []
    );

    // Calculate position with auto-flip (both vertical and horizontal)
    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      const padding = 8;
      let newPlacement = placement;

      // Check if trigger is in viewport
      const isInViewport =
        triggerRect.top >= -50 &&
        triggerRect.left >= -50 &&
        triggerRect.bottom <= window.innerHeight + 50 &&
        triggerRect.right <= window.innerWidth + 50;

      if (!isInViewport) {
        handleClose();
        return;
      }

      // Check if trigger is visible within scrollable parent
      const scrollableParent = findScrollableParent(triggerRef.current);
      if (scrollableParent) {
        const parentRect = scrollableParent.getBoundingClientRect();
        const isVisibleInParent =
          triggerRect.top >= parentRect.top - 20 &&
          triggerRect.bottom <= parentRect.bottom + 20 &&
          triggerRect.left >= parentRect.left - 20 &&
          triggerRect.right <= parentRect.right + 20;

        if (!isVisibleInParent) {
          handleClose();
          return;
        }
      }

      // Auto-flip logic - VERTICAL (top/bottom)
      if (placement.startsWith("bottom")) {
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;

        // If not enough space below but enough above, flip to top
        if (
          spaceBelow < popoverRect.height + offset + padding &&
          spaceAbove > popoverRect.height + offset + padding
        ) {
          newPlacement = placement.replace("bottom", "top") as PopoverPlacement;
        }
      } else if (placement.startsWith("top")) {
        const spaceAbove = triggerRect.top;
        const spaceBelow = window.innerHeight - triggerRect.bottom;

        // If not enough space above but enough below, flip to bottom
        if (
          spaceAbove < popoverRect.height + offset + padding &&
          spaceBelow > popoverRect.height + offset + padding
        ) {
          newPlacement = placement.replace("top", "bottom") as PopoverPlacement;
        }
      }

      // Auto-flip logic - HORIZONTAL (start/end) for top/bottom placements
      if (newPlacement.includes("top") || newPlacement.includes("bottom")) {
        if (placement.endsWith("-end")) {
          const spaceRight = window.innerWidth - triggerRect.right;
          const spaceLeft = triggerRect.left;

          // If not enough space on right but enough on left, flip to start
          if (
            spaceRight < popoverRect.width / 2 &&
            spaceLeft > popoverRect.width
          ) {
            newPlacement = newPlacement.replace(
              "-end",
              "-start"
            ) as PopoverPlacement;
          }
        } else if (placement.endsWith("-start")) {
          const spaceLeft = triggerRect.left;
          const spaceRight = window.innerWidth - triggerRect.right;

          // If not enough space on left but enough on right, flip to end
          if (
            spaceLeft < popoverRect.width / 2 &&
            spaceRight > popoverRect.width
          ) {
            newPlacement = newPlacement.replace(
              "-start",
              "-end"
            ) as PopoverPlacement;
          }
        }
      }

      // Auto-flip logic - VERTICAL (left/right)
      if (placement.startsWith("right")) {
        const spaceRight = window.innerWidth - triggerRect.right;
        const spaceLeft = triggerRect.left;

        // If not enough space on right but enough on left, flip to left
        if (
          spaceRight < popoverRect.width + offset + padding &&
          spaceLeft > popoverRect.width + offset + padding
        ) {
          newPlacement = placement.replace("right", "left") as PopoverPlacement;
        }
      } else if (placement.startsWith("left")) {
        const spaceLeft = triggerRect.left;
        const spaceRight = window.innerWidth - triggerRect.right;

        // If not enough space on left but enough on right, flip to right
        if (
          spaceLeft < popoverRect.width + offset + padding &&
          spaceRight > popoverRect.width + offset + padding
        ) {
          newPlacement = placement.replace("left", "right") as PopoverPlacement;
        }
      }

      // Auto-flip logic - HORIZONTAL (start/end) for left/right placements
      if (newPlacement.includes("left") || newPlacement.includes("right")) {
        if (placement.endsWith("-end")) {
          const spaceBottom = window.innerHeight - triggerRect.bottom;
          const spaceTop = triggerRect.top;

          // If not enough space at bottom but enough at top, flip to start
          if (
            spaceBottom < popoverRect.height / 2 &&
            spaceTop > popoverRect.height
          ) {
            newPlacement = newPlacement.replace(
              "-end",
              "-start"
            ) as PopoverPlacement;
          }
        } else if (placement.endsWith("-start")) {
          const spaceTop = triggerRect.top;
          const spaceBottom = window.innerHeight - triggerRect.bottom;

          // If not enough space at top but enough at bottom, flip to end
          if (
            spaceTop < popoverRect.height / 2 &&
            spaceBottom > popoverRect.height
          ) {
            newPlacement = newPlacement.replace(
              "-start",
              "-end"
            ) as PopoverPlacement;
          }
        }
      }

      // Update actual placement for arrow
      setActualPlacement(newPlacement);

      let top = 0;
      let left = 0;

      // Calculate based on actual placement (after flip)
      switch (newPlacement) {
        case "top":
          top = triggerRect.top - popoverRect.height - offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case "top-start":
          top = triggerRect.top - popoverRect.height - offset;
          left = triggerRect.left;
          break;
        case "top-end":
          top = triggerRect.top - popoverRect.height - offset;
          left = triggerRect.right - popoverRect.width;
          break;
        case "bottom":
          top = triggerRect.bottom + offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case "bottom-start":
          top = triggerRect.bottom + offset;
          left = triggerRect.left;
          break;
        case "bottom-end":
          top = triggerRect.bottom + offset;
          left = triggerRect.right - popoverRect.width;
          break;
        case "left":
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.left - popoverRect.width - offset;
          break;
        case "left-start":
          top = triggerRect.top;
          left = triggerRect.left - popoverRect.width - offset;
          break;
        case "left-end":
          top = triggerRect.bottom - popoverRect.height;
          left = triggerRect.left - popoverRect.width - offset;
          break;
        case "right":
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.right + offset;
          break;
        case "right-start":
          top = triggerRect.top;
          left = triggerRect.right + offset;
          break;
        case "right-end":
          top = triggerRect.bottom - popoverRect.height;
          left = triggerRect.right + offset;
          break;
      }

      // Keep within viewport (as fallback)
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - popoverRect.height - padding)
      );
      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - popoverRect.width - padding)
      );

      setPosition({ top, left });
      setIsPositioned(true); // Mark as positioned

      // Calculate arrow position to point at trigger center
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;
      const popoverLeft = left;
      const popoverTop = top;

      let arrowPos: {
        top?: string;
        left?: string;
        right?: string;
        bottom?: string;
      } = {};

      if (newPlacement.startsWith("top") || newPlacement.startsWith("bottom")) {
        // Horizontal arrow position
        const arrowLeft = triggerCenterX - popoverLeft;
        arrowPos.left = `${Math.max(
          12,
          Math.min(arrowLeft, popoverRect.width - 12)
        )}px`;
      } else if (
        newPlacement.startsWith("left") ||
        newPlacement.startsWith("right")
      ) {
        // Vertical arrow position
        const arrowTop = triggerCenterY - popoverTop;
        arrowPos.top = `${Math.max(
          12,
          Math.min(arrowTop, popoverRect.height - 12)
        )}px`;
      }

      setArrowPosition(arrowPos);
    }, [placement, offset, handleClose, findScrollableParent]);

    // Click outside handler
    useEffect(() => {
      if (!isOpen || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, closeOnClickOutside, handleClose]);

    // Escape key handler
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape, handleClose]);

    // Calculate position when opened + listen to scroll on parent containers
    useEffect(() => {
      if (isOpen) {
        calculatePosition();

        // Find scrollable parent
        const scrollableParent = findScrollableParent(triggerRef.current);

        // Recalculate on scroll/resize
        const handleUpdate = () => calculatePosition();

        window.addEventListener("scroll", handleUpdate, true);
        window.addEventListener("resize", handleUpdate);

        // Listen to parent scroll if exists
        if (scrollableParent) {
          scrollableParent.addEventListener("scroll", handleUpdate);
        }

        return () => {
          window.removeEventListener("scroll", handleUpdate, true);
          window.removeEventListener("resize", handleUpdate);
          if (scrollableParent) {
            scrollableParent.removeEventListener("scroll", handleUpdate);
          }
        };
      }
    }, [isOpen, calculatePosition, findScrollableParent]);

    // Setup portal container
    useEffect(() => {
      const container = appendTo === "body" ? document.body : appendTo;
      setPortalContainer(container as HTMLElement);
    }, [appendTo]);

    // Get arrow position based on actual placement (after flip)
    const getArrowClasses = (): string => {
      const base =
        "absolute w-3 h-3 bg-white border border-gray-200 transform rotate-45";

      if (actualPlacement.startsWith("top")) {
        return `${base} border-t-0 border-l-0 bottom-[-6px]`;
      } else if (actualPlacement.startsWith("bottom")) {
        return `${base} border-b-0 border-r-0 top-[-6px]`;
      } else if (actualPlacement.startsWith("left")) {
        return `${base} border-l-0 border-b-0 right-[-6px]`;
      } else if (actualPlacement.startsWith("right")) {
        return `${base} border-r-0 border-t-0 left-[-6px]`;
      }

      return base;
    };

    const getArrowStyle = (): React.CSSProperties => {
      return arrowPosition;
    };

    // Render popover content
    const renderPopover = () => {
      if (!isOpen || !portalContainer) return null;

      return createPortal(
        <div
          ref={popoverRef}
          className={cn(
            "fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200",
            "transition-opacity duration-200",
            isPositioned ? "opacity-100" : "opacity-0", // Prevent flash on first render
            className
          )}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside popover from propagating
        >
          {/* Arrow */}
          {arrow && (
            <div className={getArrowClasses()} style={getArrowStyle()} />
          )}

          {/* Content */}
          <div
            className={cn(
              "relative",
              scrollable ? "overflow-auto" : "overflow-hidden",
              contentClassName
            )}
            style={{
              maxHeight: scrollable && maxHeight ? maxHeight : undefined,
            }}
          >
            {/* Close button */}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 z-10 p-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Content */}
            {content}
          </div>
        </div>,
        portalContainer
      );
    };

    return (
      <>
        {/* Trigger */}
        <div ref={triggerRef} onClick={handleToggle} className="inline-block">
          {trigger}
        </div>

        {/* Popover */}
        {renderPopover()}
      </>
    );
  }
);

Popover.displayName = "Popover";

export default Popover;
