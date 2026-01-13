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
 * │  Component: Badge (with UUID support)                   │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { ReactNode } from "react";
import { getColorFromUuid } from "@lib/helper.func";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
};

// ========================================
// TYPES
// ========================================

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "purple"
  | "pink"
  | "indigo"
  | "teal";

export type BadgeSize = "small" | "medium" | "large";

export type BadgeRounded = "default" | "full" | "square";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: BadgeRounded;
  icon?: ReactNode;
  showDot?: boolean;
  uuid?: string;
  onRemove?: () => void;
  className?: string;
}

interface ColorConfig {
  bg: string;
  text: string;
  border: string;
  iconBg: string;
  dotBg: string;
}

interface SizeConfig {
  padding: string;
  text: string;
  icon: string;
  iconPadding: string;
}

// ========================================
// HELPER: Hex to RGB
// ========================================
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// ========================================
// HELPER: Lighten color
// ========================================
const lightenColor = (hex: string, percent: number): string => {
  const { r, g, b } = hexToRgb(hex);
  const amt = Math.round(2.55 * percent);
  return `#${[r, g, b]
    .map((c) =>
      Math.min(255, c + amt)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`;
};

// ========================================
// HELPER: Darken color
// ========================================
const darkenColor = (hex: string, percent: number): string => {
  const { r, g, b } = hexToRgb(hex);
  const amt = Math.round(2.55 * percent);
  return `#${[r, g, b]
    .map((c) =>
      Math.max(0, c - amt)
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`;
};

// ========================================
// HELPER: Get luminance
// ========================================
const getLuminance = (hex: string): number => {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// ========================================
// COMPONENT
// ========================================

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "medium",
  rounded = "default",
  icon,
  showDot = false,
  uuid, // ✅ NEW
  onRemove,
  className = "",
}) => {
  // ========================================
  // COLOR VARIANTS
  // ========================================
  const variants: Record<BadgeVariant, ColorConfig> = {
    primary: {
      bg: "bg-primary-50",
      text: "text-primary-700",
      border: "border-primary-200",
      iconBg: "bg-primary-500",
      dotBg: "bg-primary-500",
    },
    secondary: {
      bg: "bg-secondary-50",
      text: "text-secondary-700",
      border: "border-secondary-200",
      iconBg: "bg-secondary-500",
      dotBg: "bg-secondary-500",
    },
    success: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      iconBg: "bg-green-500",
      dotBg: "bg-green-500",
    },
    danger: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      iconBg: "bg-red-500",
      dotBg: "bg-red-500",
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      iconBg: "bg-yellow-500",
      dotBg: "bg-yellow-500",
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      iconBg: "bg-blue-500",
      dotBg: "bg-blue-500",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      iconBg: "bg-purple-500",
      dotBg: "bg-purple-500",
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-700",
      border: "border-pink-200",
      iconBg: "bg-pink-500",
      dotBg: "bg-pink-500",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
      iconBg: "bg-indigo-500",
      dotBg: "bg-indigo-500",
    },
    teal: {
      bg: "bg-teal-50",
      text: "text-teal-700",
      border: "border-teal-200",
      iconBg: "bg-teal-500",
      dotBg: "bg-teal-500",
    },
  };

  // ========================================
  // SIZE VARIANTS
  // ========================================
  const sizes: Record<BadgeSize, SizeConfig> = {
    small: {
      padding: "px-2 py-1",
      text: "text-xs",
      icon: "w-4 h-4",
      iconPadding: "p-1",
    },
    medium: {
      padding: "px-3 py-1.5",
      text: "text-sm",
      icon: "w-5 h-5",
      iconPadding: "p-1.5",
    },
    large: {
      padding: "px-4 py-2",
      text: "text-base",
      icon: "w-6 h-6",
      iconPadding: "p-2",
    },
  };

  // ========================================
  // ROUNDED VARIANTS
  // ========================================
  const roundedStyles: Record<BadgeRounded, string> = {
    default: "rounded-lg",
    full: "rounded-full",
    square: "rounded-none",
  };

  // ========================================
  // UUID COLOR GENERATION
  // ========================================
  const getUuidColors = () => {
    if (!uuid) return null;

    const baseColor = getColorFromUuid(uuid);
    const bgColor = lightenColor(baseColor, 80); // Light background
    const borderColor = lightenColor(baseColor, 60); // Slightly darker border
    const textColor = darkenColor(baseColor, 20); // Dark text
    const luminance = getLuminance(textColor);
    const finalTextColor =
      luminance > 0.5 ? darkenColor(baseColor, 40) : textColor;

    return {
      bg: bgColor,
      text: finalTextColor,
      border: borderColor,
      iconBg: baseColor,
      dotBg: baseColor,
    };
  };

  const uuidColors = getUuidColors();
  const currentVariant = uuidColors || variants[variant];
  const currentSize = sizes[size];
  const currentRounded = roundedStyles[rounded];

  // Remove button sizes
  const getRemoveButtonSize = (): string => {
    switch (size) {
      case "small":
        return "w-3 h-3";
      case "medium":
        return "w-4 h-4";
      case "large":
        return "w-5 h-5";
      default:
        return "w-4 h-4";
    }
  };

  const getRemoveIconSize = (): string => {
    switch (size) {
      case "small":
        return "w-2 h-2";
      case "medium":
        return "w-3 h-3";
      case "large":
        return "w-4 h-4";
      default:
        return "w-3 h-3";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-medium border transition-all",
        !uuid && currentVariant.bg,
        !uuid && currentVariant.text,
        !uuid && currentVariant.border,
        currentSize.padding,
        currentSize.text,
        currentRounded,
        className
      )}
      style={
        uuid
          ? {
              backgroundColor: currentVariant.bg,
              color: currentVariant.text,
              borderColor: currentVariant.border,
            }
          : undefined
      }
    >
      {/* Dot Indicator */}
      {showDot && (
        <span
          className={cn("w-2 h-2 rounded-full", !uuid && currentVariant.dotBg)}
          style={uuid ? { backgroundColor: currentVariant.dotBg } : undefined}
        ></span>
      )}

      {/* Icon */}
      {icon && (
        <span
          className={cn(
            "inline-flex items-center justify-center text-white",
            !uuid && currentVariant.iconBg,
            currentSize.iconPadding,
            currentSize.icon,
            rounded === "full" ? "rounded-full" : "rounded"
          )}
          style={uuid ? { backgroundColor: currentVariant.iconBg } : undefined}
        >
          {icon}
        </span>
      )}

      {/* Text */}
      <span>{children}</span>

      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className={cn(
            "ml-1 hover:bg-black/10 rounded-full transition-colors",
            "flex items-center justify-center",
            getRemoveButtonSize()
          )}
          aria-label="Remove"
          type="button"
        >
          <svg
            className={getRemoveIconSize()}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;
