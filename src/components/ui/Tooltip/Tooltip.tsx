import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  cloneElement,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";

export type TooltipPlacement =
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

export type TooltipTrigger = "hover" | "click";

export type TooltipVariant =
  | "dark"
  | "light"
  | "gray"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning";

export interface TooltipProps {
  title?: string;
  component?: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
  arrow?: boolean;
  variant?: TooltipVariant;
  followCursor?: boolean;
  delay?: number;
  className?: string;
  usePortal?: boolean;
}

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
};

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  component,
  children,
  placement = "top",
  trigger = "hover",
  arrow = true,
  variant = "dark",
  followCursor = false,
  delay = 200,
  className = "",
  usePortal = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Variants
  const variants: Record<
    TooltipVariant,
    { bg: string; text: string; border: string; arrow: string }
  > = {
    dark: {
      bg: "bg-gray-900",
      text: "text-white",
      border: "border-gray-900",
      arrow: "border-gray-900",
    },
    light: {
      bg: "bg-white",
      text: "text-gray-900",
      border: "border-gray-200",
      arrow: "border-gray-200",
    },
    gray: {
      bg: "bg-gray-600",
      text: "text-white",
      border: "border-gray-600",
      arrow: "border-gray-600",
    },
    primary: {
      bg: "bg-primary-500",
      text: "text-white",
      border: "border-primary-500",
      arrow: "border-primary-500",
    },
    secondary: {
      bg: "bg-secondary-500",
      text: "text-white",
      border: "border-secondary-500",
      arrow: "border-secondary-500",
    },
    success: {
      bg: "bg-green-500",
      text: "text-white",
      border: "border-green-500",
      arrow: "border-green-500",
    },
    error: {
      bg: "bg-red-500",
      text: "text-white",
      border: "border-red-500",
      arrow: "border-red-500",
    },
    warning: {
      bg: "bg-yellow-500",
      text: "text-gray-900",
      border: "border-yellow-500",
      arrow: "border-yellow-500",
    },
  };

  const currentVariant = variants[variant];

  const calculatePosition = (useCurrentCursor = false) => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const offset = 8;
    const arrowSize = arrow ? 6 : 0;

    let top = 0;
    let left = 0;

    if (followCursor && useCurrentCursor) {
      top = cursorPosition.y + offset + arrowSize;
      left = cursorPosition.x;
    } else {
      const [mainPlacement, subPlacement] = placement.split("-") as [
        string,
        string?
      ];

      // ✅ Use viewport coordinates + scroll
      switch (mainPlacement) {
        case "top":
          top =
            triggerRect.top +
            window.scrollY -
            tooltipRect.height -
            offset -
            arrowSize;
          left =
            triggerRect.left +
            window.scrollX +
            triggerRect.width / 2 -
            tooltipRect.width / 2;
          if (subPlacement === "start")
            left = triggerRect.left + window.scrollX;
          if (subPlacement === "end")
            left = triggerRect.right + window.scrollX - tooltipRect.width;
          break;

        case "bottom":
          top = triggerRect.bottom + window.scrollY + offset + arrowSize;
          left =
            triggerRect.left +
            window.scrollX +
            triggerRect.width / 2 -
            tooltipRect.width / 2;
          if (subPlacement === "start")
            left = triggerRect.left + window.scrollX;
          if (subPlacement === "end")
            left = triggerRect.right + window.scrollX - tooltipRect.width;
          break;

        case "left":
          top =
            triggerRect.top +
            window.scrollY +
            triggerRect.height / 2 -
            tooltipRect.height / 2;
          left =
            triggerRect.left +
            window.scrollX -
            tooltipRect.width -
            offset -
            arrowSize;
          if (subPlacement === "start") top = triggerRect.top + window.scrollY;
          if (subPlacement === "end")
            top = triggerRect.bottom + window.scrollY - tooltipRect.height;
          break;

        case "right":
          top =
            triggerRect.top +
            window.scrollY +
            triggerRect.height / 2 -
            tooltipRect.height / 2;
          left = triggerRect.right + window.scrollX + offset + arrowSize;
          if (subPlacement === "start") top = triggerRect.top + window.scrollY;
          if (subPlacement === "end")
            top = triggerRect.bottom + window.scrollY - tooltipRect.height;
          break;
      }

      const padding = 8;
      if (
        left + tooltipRect.width >
        window.innerWidth + window.scrollX - padding
      ) {
        left = window.innerWidth + window.scrollX - tooltipRect.width - padding;
      }
      if (left < window.scrollX + padding) {
        left = window.scrollX + padding;
      }
      if (
        top + tooltipRect.height >
        window.innerHeight + window.scrollY - padding
      ) {
        top =
          window.innerHeight + window.scrollY - tooltipRect.height - padding;
      }
      if (top < window.scrollY + padding) {
        top = window.scrollY + padding;
      }
    }

    setPosition({ top, left });
  };

  const showTooltip = () => {
    if (delay) {
      timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (followCursor) {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition(followCursor);
      const handleScroll = () => calculatePosition(followCursor);
      window.addEventListener("scroll", handleScroll, true);
      return () => window.removeEventListener("scroll", handleScroll, true);
    }
  }, [isVisible, placement, followCursor, cursorPosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const getArrowClasses = () => {
    const [mainPlacement, subPlacement] = placement.split("-") as [
      string,
      string?
    ];
    const arrowClasses = [];

    switch (mainPlacement) {
      case "top":
        arrowClasses.push(
          "bottom-[-5px]",
          "left-1/2",
          "-translate-x-1/2",
          "border-t-6",
          "border-x-6",
          "border-x-transparent"
        );
        if (subPlacement === "start") {
          arrowClasses.splice(-2, 2);
          arrowClasses.push("left-[20px]");
        }
        if (subPlacement === "end") {
          arrowClasses.splice(-2, 2);
          arrowClasses.push("right-[20px]", "left-auto");
        }
        break;

      case "bottom":
        arrowClasses.push(
          "top-[-5px]",
          "left-1/2",
          "-translate-x-1/2",
          "border-b-6",
          "border-x-6",
          "border-x-transparent"
        );
        if (subPlacement === "start") {
          arrowClasses.splice(-5, 2);
          arrowClasses.push("left-[20px]");
        }
        if (subPlacement === "end") {
          arrowClasses.splice(-5, 2);
          arrowClasses.push("right-[20px]", "left-auto");
        }
        break;

      case "left":
        arrowClasses.push(
          "right-[-5px]",
          "top-1/2",
          "-translate-y-1/2",
          "border-l-6",
          "border-y-6",
          "border-y-transparent"
        );
        if (subPlacement === "start") {
          arrowClasses.splice(-4, 2);
          arrowClasses.push("top-[20px]");
        }
        if (subPlacement === "end") {
          arrowClasses.splice(-4, 2);
          arrowClasses.push("bottom-[20px]", "top-auto");
        }
        break;

      case "right":
        arrowClasses.push(
          "left-[-5px]",
          "top-1/2",
          "-translate-y-1/2",
          "border-r-6",
          "border-y-6",
          "border-y-transparent"
        );
        if (subPlacement === "start") {
          arrowClasses.splice(-4, 2);
          arrowClasses.push("top-[20px]");
        }
        if (subPlacement === "end") {
          arrowClasses.splice(-4, 2);
          arrowClasses.push("bottom-[20px]", "top-auto");
        }
        break;
    }

    return arrowClasses.join(" ");
  };

  const arrowClasses = getArrowClasses();

  const childWithHandlers = cloneElement(children as any, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node;
      const childRef = (children as any).ref;
      if (typeof childRef === "function") {
        childRef(node);
      } else if (childRef) {
        childRef.current = node;
      }
    },
    ...(trigger === "hover"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            if ((children as any).props?.onMouseEnter) {
              (children as any).props.onMouseEnter(e);
            }
            showTooltip();
          },
          onMouseLeave: (e: React.MouseEvent) => {
            if ((children as any).props?.onMouseLeave) {
              (children as any).props.onMouseLeave(e);
            }
            hideTooltip();
          },
          onMouseMove: (e: React.MouseEvent) => {
            if ((children as any).props?.onMouseMove) {
              (children as any).props.onMouseMove(e);
            }
            handleMouseMove(e);
          },
        }
      : {
          onClick: (e: React.MouseEvent) => {
            if ((children as any).props?.onClick) {
              (children as any).props.onClick(e);
            }
            setIsVisible(!isVisible);
          },
        }),
  });

  if (!title && !component) return children;

  const tooltipContent = isVisible && (
    <div
      ref={tooltipRef}
      className={cn(
        "absolute z-[9999] px-3 py-2 text-sm rounded-lg shadow-lg pointer-events-auto",
        "transition-opacity duration-200",
        variant === "light" && "border",
        currentVariant.bg,
        currentVariant.text,
        currentVariant.border,
        className
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onMouseEnter={trigger === "hover" ? showTooltip : undefined}
      onMouseLeave={trigger === "hover" ? hideTooltip : undefined}
    >
      {component || title}
      {arrow && (
        <div
          className={cn(
            "absolute w-0 h-0 border-solid",
            currentVariant.arrow,
            arrowClasses
          )}
        />
      )}
    </div>
  );

  return (
    <>
      {childWithHandlers}
      {usePortal &&
        tooltipContent &&
        createPortal(tooltipContent, document.body)}
      {!usePortal && tooltipContent}
      {isVisible && trigger === "click" && (
        <div className="fixed inset-0 z-[9998]" onClick={hideTooltip} />
      )}
    </>
  );
};

export default Tooltip;
