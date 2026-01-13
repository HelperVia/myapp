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
 * │  Component: Tab                                         │
 * └─────────────────────────────────────────────────────────┘
 */

import React from "react";
import { TabProps } from "./types";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ").trim();
};

export const Tab: React.FC<TabProps> = ({
  value,
  label,
  icon,
  disabled = false,
  badge,
  active = false,
  onClick,
  variant = "default",
  size = "md",
  className = "",
}) => {
  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  // Variant classes
  const variantClasses = {
    default: {
      base: "border-b-3 transition-colors",
      active: "border-primary-500 text-primary-500",
      inactive:
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
    },
    pills: {
      base: "rounded-lg transition-all",
      active: "bg-primary-500 text-white shadow-sm",
      inactive: "text-gray-700 hover:bg-gray-100",
    },
    underline: {
      base: "border-b-3 transition-colors",
      active: "border-secondary-500 text-secondary-600 font-medium font-bold",
      inactive: "border-transparent text-gray-600 hover:text-gray-900",
    },
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-disabled={disabled}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-medium cursor-pointer select-none focus:outline-none",
        sizeClasses[size],
        variantClasses[variant].base,
        active
          ? variantClasses[variant].active
          : variantClasses[variant].inactive,
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Icon */}
      {icon && <span className="flex-shrink-0">{icon}</span>}

      {/* Label */}
      <span>{label}</span>

      {/* Badge */}
      {badge && (
        <span
          className={cn(
            "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium",
            active
              ? variant === "pills"
                ? "bg-white/20 text-white"
                : "bg-primary-100 text-primary-700"
              : "bg-gray-200 text-gray-700"
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

export default Tab;
