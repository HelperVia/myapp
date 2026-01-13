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
 * │  Component: Select                                      │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { ReactNode } from "react";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
};

export type FormControlSize = "small" | "medium" | "large";

interface FormControlProps {
  children: ReactNode;
  size?: FormControlSize;
  error?: boolean;
  isFocused?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * FormControl - Reusable wrapper for form inputs
 * Provides consistent border, hover, focus, and error states
 *
 * Used by: TextField, InputNumber, Select, etc.
 * NOT used by: RadioGroup, Checkbox (they have different styling)
 */
export const FormControl: React.FC<FormControlProps> = ({
  children,
  size = "medium",
  error = false,
  isFocused = false,
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
}) => {
  const sizeClasses: Record<FormControlSize, string> = {
    small: "h-10",
    medium: "h-12",
    large: "h-14",
  };

  const getBorderColor = (): string => {
    if (error) return "var(--color-error)";
    if (isFocused) return "var(--gray-950)";
    return "var(--gray-300)";
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex items-center rounded-lg transition-all duration-80",
        sizeClasses[size],
        fullWidth && "w-full",
        disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white",
        !error && !isFocused && "hover:!border-gray-400",
        className
      )}
      style={{
        border: `${isFocused ? "2px" : "1px"} solid ${getBorderColor()}`,
        padding: isFocused || error ? "0" : "1px",
      }}
    >
      {children}
    </div>
  );
};

export default FormControl;
