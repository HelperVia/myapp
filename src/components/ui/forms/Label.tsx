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

import React, { LabelHTMLAttributes, ReactNode, ElementType } from "react";
import { FormControlSize } from "./FormControl";
export type LabelSize = FormControlSize;

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: LabelSize;
  htmlFor?: string;
  as?: ElementType; // ✅ NEW - allows rendering as different element
}

export const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  disabled = false,
  error = false,
  size = "medium",
  className = "",
  htmlFor,
  as: Component = "label", // ✅ Default to 'label', but can be 'div' or 'span'
  ...props
}) => {
  const sizeClasses: Record<LabelSize, string> = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  const baseClasses = "block font-medium mb-2";

  const colorClasses = disabled
    ? "text-gray-400 cursor-not-allowed"
    : error
    ? "text-error"
    : "text-gray-700";

  return (
    <Component
      htmlFor={Component === "label" ? htmlFor : undefined}
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses} ${className}`}
      {...props}
    >
      {children}
      {required && !disabled && (
        <span className="text-red-500 ml-1" aria-label="required">
          *
        </span>
      )}
    </Component>
  );
};

export default Label;
