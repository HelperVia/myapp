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

import React, {
  forwardRef,
  useState,
  InputHTMLAttributes,
  ReactNode,
  FocusEvent,
  ChangeEvent,
} from "react";
import { Label } from "./Label";
import { FormControl, FormControlSize } from "./FormControl";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
};

export type TextFieldSize = FormControlSize;

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: FormControlSize;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error = "",
      helperText,
      fullWidth = false,
      size = "medium",
      startAdornment,
      endAdornment,
      className = "",
      disabled,
      required,
      onFocus,
      onChange,
      onBlur,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Generate unique ID if not provided
    const inputId =
      id || `textfield-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <Label
            htmlFor={inputId}
            required={required}
            disabled={disabled}
            error={error ? true : false}
          >
            {label}
          </Label>
        )}

        <FormControl
          size={size}
          error={error ? true : false}
          isFocused={isFocused}
          disabled={disabled}
          fullWidth={fullWidth}
        >
          {startAdornment && (
            <div className="pl-3 text-gray-400 flex items-center">
              {startAdornment}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type={props?.type ?? "text"}
            className={cn(
              "m-1 flex-1 h-full bg-transparent outline-none text-gray-900",
              "placeholder-gray-400 text-sm",
              "disabled:text-gray-500 disabled:cursor-not-allowed",
              startAdornment ? "pl-2" : "pl-4",
              endAdornment ? "pr-2" : "pr-4",
              className
            )}
            {...props}
          />

          {endAdornment && (
            <div className="pr-3 text-gray-400 flex items-center">
              {endAdornment}
            </div>
          )}
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

TextField.displayName = "TextField";

export default TextField;
