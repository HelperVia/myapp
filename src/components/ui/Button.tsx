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
 * │  Component: Button                                      │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "primary-light"
  | "primary-dark"
  | "primary-soft"
  | "primary-outlined"
  | "primary-outlined-bold"
  | "primary-ghost"
  | "primary-gradient"
  | "secondary"
  | "secondary-light"
  | "secondary-dark"
  | "secondary-soft"
  | "secondary-outlined"
  | "secondary-outlined-bold"
  | "secondary-ghost"
  | "secondary-gradient"
  | "primary-secondary"
  | "secondary-primary"
  | "primary-tonal"
  | "secondary-tonal"
  | "primary-inverted"
  | "secondary-inverted"
  | "success"
  | "success-soft"
  | "success-outlined"
  | "error"
  | "error-soft"
  | "error-outlined"
  | "warning"
  | "warning-soft"
  | "gray"
  | "gray-dark"
  | "gray-outlined"
  | "ghost"
  | "glass-primary"
  | "glass-secondary"
  | "elevated-primary"
  | "elevated-secondary";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  leftIcon = null,
  rightIcon = null,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled && !loading) {
      onClick(event);
    }
  };

  // Detect icon button automatically
  const isIconButton = iconOnly || (!children && (leftIcon || rightIcon));

  // Base styles
  const baseStyles =
    "cursor-pointer relative inline-flex items-center justify-center font-medium transition-all duration-200 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed select-none focus:outline-none";

  // Variant styles
  const variantStyles: Record<ButtonVariant, string> = {
    /*PRIMARY VARIANTS*/
    primary:
      "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:shadow-md",

    "primary-light":
      "bg-primary-400 text-white hover:bg-primary-500 active:bg-primary-600 shadow-sm hover:shadow-md",

    "primary-dark":
      "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 shadow-sm hover:shadow-md",

    "primary-soft":
      "bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 shadow-sm",

    "primary-outlined":
      "bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",

    "primary-outlined-bold":
      "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",

    "primary-ghost":
      "bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100",

    "primary-gradient":
      "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg",

    /* SECONDARY VARIANTS*/
    secondary:
      "bg-secondary-500 text-white hover:bg-secondary-400 active:bg-secondary-400 shadow-sm hover:shadow-md",

    "secondary-light":
      "bg-secondary-300 text-white hover:bg-secondary-400 active:bg-secondary-500 shadow-sm hover:shadow-md",

    "secondary-dark":
      "bg-secondary-700 text-white hover:bg-secondary-600 active:bg-secondary-500 shadow-sm hover:shadow-md",

    "secondary-soft":
      "bg-secondary-50 text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200 shadow-sm",

    "secondary-outlined":
      "bg-transparent border border-secondary-500 text-secondary-500 hover:bg-secondary-50 active:bg-secondary-100",

    "secondary-outlined-bold":
      "bg-transparent border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 active:bg-secondary-100",

    "secondary-ghost":
      "bg-transparent text-secondary-500 hover:bg-secondary-100 active:bg-secondary-200",

    "secondary-gradient":
      "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-400 hover:to-secondary-500 shadow-md hover:shadow-lg",

    /* DUAL COLOR VARIANTS*/
    "primary-secondary":
      "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-md hover:shadow-lg",

    "secondary-primary":
      "bg-gradient-to-r from-secondary-500 to-primary-500 text-white hover:from-secondary-600 hover:to-primary-600 shadow-md hover:shadow-lg",

    /*TONAL VARIANTS*/
    "primary-tonal":
      "bg-primary-100 text-primary-600 hover:bg-primary-200 active:bg-primary-300 shadow-sm",

    "secondary-tonal":
      "bg-secondary-100 text-secondary-600 hover:bg-secondary-200 active:bg-secondary-300 shadow-sm",

    /*INVERTED VARIANTS*/
    "primary-inverted":
      "bg-white text-primary-500 border border-primary-200 hover:bg-primary-50 active:bg-primary-100 shadow-sm",

    "secondary-inverted":
      "bg-white text-secondary-500 border border-secondary-200 hover:bg-secondary-50 active:bg-secondary-100 shadow-sm",

    /*STATUS COLORS*/
    success:
      "bg-success text-white hover:brightness-110 active:brightness-95 shadow-sm hover:shadow-md",

    "success-soft":
      "bg-green-50 text-green-700 hover:bg-green-100 active:bg-green-200 shadow-sm",

    "success-outlined":
      "bg-transparent border border-success text-success hover:bg-green-50 active:bg-green-100",

    error:
      "bg-error text-white hover:brightness-110 active:brightness-95 shadow-sm hover:shadow-md",

    "error-soft":
      "bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200 shadow-sm",

    "error-outlined":
      "bg-transparent border border-error text-error hover:bg-red-50 active:bg-red-100",

    warning:
      "bg-warning text-gray-900 hover:brightness-110 active:brightness-95 shadow-sm hover:shadow-md",

    "warning-soft":
      "bg-yellow-50 text-yellow-800 hover:bg-yellow-100 active:bg-yellow-200 shadow-sm",

    /*NEUTRAL VARIANTS*/
    gray: "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 shadow-sm",

    "gray-dark":
      "bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-500 shadow-sm hover:shadow-md",

    "gray-outlined":
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200",

    ghost: "bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-100",

    /*GLASS/BLUR VARIANTS*/
    "glass-primary":
      "bg-primary-500/10 backdrop-blur-sm text-primary-600 border border-primary-200 hover:bg-primary-500/20 shadow-sm",

    "glass-secondary":
      "bg-secondary-500/10 backdrop-blur-sm text-secondary-600 border border-secondary-200 hover:bg-secondary-500/20 shadow-sm",

    /*ELEVATED VARIANTS*/
    "elevated-primary":
      "bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200",

    "elevated-secondary":
      "bg-secondary-500 text-white hover:bg-secondary-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200",
  };

  // Size styles - normal button
  const normalSizeStyles: Record<ButtonSize, string> = {
    xs: "px-2 py-1 text-xs h-6 gap-1 rounded-md",
    sm: "px-3 py-1.5 text-sm h-8 gap-1.5 rounded-md",
    md: "px-4 py-2 text-sm h-10 gap-2 rounded-lg",
    lg: "px-5 py-2.5 text-base h-11 gap-2 rounded-lg",
    xl: "px-6 py-3 text-base h-12 gap-2.5 rounded-lg",
    "2xl": "px-8 py-4 text-lg h-14 gap-3 rounded-xl",
  };

  // Size styles - icon button
  const iconSizeStyles: Record<ButtonSize, string> = {
    xs: "w-6 h-6 p-1 rounded-md",
    sm: "w-8 h-8 p-1.5 rounded-md",
    md: "w-10 h-10 p-2 rounded-lg",
    lg: "w-11 h-11 p-2.5 rounded-lg",
    xl: "w-12 h-12 p-3 rounded-lg",
    "2xl": "w-14 h-14 p-3.5 rounded-xl",
  };

  const sizeStyle = isIconButton
    ? iconSizeStyles[size]
    : normalSizeStyles[size];

  const widthStyle = fullWidth ? "w-full" : "";

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyle}
        ${widthStyle}
        ${className}
      `.trim()}
      {...props}
    >
      {/* Icon Button Content */}
      {isIconButton ? (
        <span className="relative z-10 flex items-center justify-center">
          {loading ? <LoadingSpinner /> : leftIcon || rightIcon || children}
        </span>
      ) : (
        /* Normal Button Content */
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading && <LoadingSpinner />}
          {!loading && leftIcon && (
            <span className="flex-shrink-0">{leftIcon}</span>
          )}
          {children && <span>{children}</span>}
          {!loading && rightIcon && (
            <span className="flex-shrink-0">{rightIcon}</span>
          )}
        </span>
      )}
    </button>
  );
};

export default Button;
