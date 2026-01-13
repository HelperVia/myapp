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
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { Label } from "./Label";
import { FormControl, FormControlSize } from "./FormControl";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
};

// ========================================
// TYPES
// ========================================

export interface SelectOption {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  size?: FormControlSize;
  placeholder?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  icon?: ReactNode;
  id?: string;
  name?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error = false,
      helperText,
      fullWidth = false,
      size = "medium",
      placeholder = "Select an option",
      options = [],
      value,
      onChange,
      onBlur,
      disabled = false,
      required = false,
      className = "",
      icon,
      id,
      name,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Generate unique ID
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Find selected option
    const selectedOption = options.find((opt) => opt.value === value);

    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setIsFocused(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleFocus = (): void => {
      if (!disabled) {
        setIsFocused(true);
      }
    };

    const handleBlur = (): void => {
      setIsFocused(false);
      if (onBlur) {
        onBlur();
      }
    };

    const handleToggle = (): void => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setIsFocused(true);
      }
    };

    const handleSelect = (option: SelectOption): void => {
      if (!option.disabled) {
        if (onChange) {
          onChange(option.value);
        }
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case "Escape":
          setIsOpen(false);
          setIsFocused(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // Navigate down in options
            const currentIndex = options.findIndex(
              (opt) => opt.value === value
            );
            const nextIndex = Math.min(currentIndex + 1, options.length - 1);
            if (!options[nextIndex].disabled) {
              handleSelect(options[nextIndex]);
            }
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // Navigate up in options
            const currentIndex = options.findIndex(
              (opt) => opt.value === value
            );
            const prevIndex = Math.max(currentIndex - 1, 0);
            if (!options[prevIndex].disabled) {
              handleSelect(options[prevIndex]);
            }
          }
          break;
        default:
          break;
      }
    };

    return (
      <div className={cn(fullWidth ? "w-full" : "inline-block", "relative")}>
        {label && (
          <Label as="div" required={required} disabled={disabled} error={error}>
            {label}
          </Label>
        )}

        <FormControl
          size={size}
          error={error}
          isFocused={isFocused || isOpen}
          disabled={disabled}
          fullWidth={fullWidth}
          onClick={handleToggle}
        >
          {/* Icon */}
          {icon && (
            <div className="pl-3 text-gray-400 flex items-center">{icon}</div>
          )}

          {/* Selected Value Display */}
          <div
            ref={selectRef}
            id={selectId}
            tabIndex={disabled ? -1 : 0}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={`${selectId}-listbox`}
            aria-labelledby={label ? `${selectId}-label` : undefined}
            className={cn(
              "flex-1 h-full bg-transparent outline-none cursor-pointer",
              "flex items-center px-4 text-sm",
              disabled && "cursor-not-allowed",
              !selectedOption && "text-gray-400",
              selectedOption && "text-gray-900",
              className
            )}
          >
            <span className="flex-1">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          {/* Hidden native select for form compatibility */}
          <select
            ref={ref}
            name={name}
            value={value || ""}
            onChange={() => {}} // Controlled by custom dropdown
            disabled={disabled}
            required={required}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <div className="pr-3 text-gray-400 flex items-center pointer-events-none">
            <svg
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
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
          </div>
        </FormControl>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            ref={dropdownRef}
            id={`${selectId}-listbox`}
            role="listbox"
            className={cn(
              "absolute z-50 w-full mt-1",
              "bg-white border border-gray-300 rounded-lg shadow-lg",
              "max-h-60 overflow-y-auto"
            )}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              const isDisabled = option.disabled;

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "px-4 py-2.5 cursor-pointer flex items-center justify-between",
                    "text-sm transition-colors",
                    isSelected && "bg-orange-50 text-gray-900 font-medium",
                    !isSelected &&
                      !isDisabled &&
                      "text-gray-700 hover:bg-gray-50",
                    isDisabled && "text-gray-400 cursor-not-allowed bg-gray-50",
                    "first:rounded-t-lg last:rounded-b-lg"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <span className="text-lg">{option.icon}</span>
                    )}
                    <span>{option.label}</span>
                  </div>

                  {/* Check Icon for selected */}
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-[#e7411b]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        )}

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

Select.displayName = "Select";

export default Select;
