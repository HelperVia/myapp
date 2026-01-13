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

import React, { forwardRef, useState, InputHTMLAttributes } from "react";
import { Label } from "./Label";
import { FormControl, FormControlSize } from "./FormControl";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
};

export type InputNumberSize = FormControlSize;
interface InputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: InputNumberSize;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      label,
      error = false,
      helperText,
      fullWidth = false,
      size = "medium",
      min = 0,
      max = 100,
      step = 1,
      value = 0,
      onChange,
      className = "",
      disabled,
      onFocus,
      onBlur,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const increment = () => {
      if (disabled) return;
      const newValue = Math.min(max, value + step);
      onChange?.(newValue);
    };

    const decrement = () => {
      if (disabled) return;
      const newValue = Math.max(min, value - step);
      onChange?.(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue)) {
        onChange?.(Math.min(max, Math.max(min, newValue)));
      }
    };

    // Generate unique ID for accessibility
    const inputId =
      id || `input-number-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`${fullWidth ? "w-full" : "inline-block"}`}>
        {label && (
          <Label
            htmlFor={inputId}
            required={required}
            disabled={disabled}
            error={error}
          >
            {label}
          </Label>
        )}

        <FormControl
          size={size}
          error={error}
          isFocused={isFocused}
          disabled={disabled}
        >
          <input
            id={inputId}
            ref={ref}
            type="text"
            inputMode="numeric"
            disabled={disabled}
            required={required}
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "w-[50px] flex-1 h-full bg-transparent outline-none text-gray-900",
              "text-sm text-center",
              "disabled:text-gray-500 disabled:cursor-not-allowed",
              className
            )}
            style={{
              appearance: "textfield",
              MozAppearance: "textfield",
              WebkitAppearance: "none",
            }}
            {...props}
          />

          {/* Stepper Buttons */}
          <div
            className="flex flex-col h-full"
            style={{ borderLeft: "1px solid #e0e0e0" }}
          >
            <button
              type="button"
              onClick={increment}
              disabled={disabled || value >= max}
              className="flex-1 px-2 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer transition-colors rounded-tr-lg"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <div style={{ borderTop: "1px solid #e0e0e0" }} />
            <button
              type="button"
              onClick={decrement}
              disabled={disabled || value <= min}
              className="flex-1 px-2 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer transition-colors rounded-br-lg"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </FormControl>

        {(helperText || error) && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-error" : "text-gray-500"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";

export default InputNumber;
