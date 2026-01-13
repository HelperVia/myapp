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
 * │  Component: Autocomplete (Multi-Select)                 │
 * └─────────────────────────────────────────────────────────┘
 */

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
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

export interface AutocompleteOption<T = any> {
  label: string;
  value: string;
  data?: T;
  disabled?: boolean;
}

export type AutocompleteSize = FormControlSize;
export type AutocompleteVariant = "primary" | "secondary";

export interface AutocompleteProps<T = any> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: AutocompleteSize;
  variant?: AutocompleteVariant;
  placeholder?: string;
  options?: AutocompleteOption<T>[];
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  icon?: ReactNode;
  id?: string;
  name?: string;
  renderOption?: (option: AutocompleteOption<T>) => ReactNode;
  filterOptions?: (
    options: AutocompleteOption<T>[],
    query: string,
    selected: string[]
  ) => AutocompleteOption<T>[];
  noOptionsText?: string;
  maxTags?: number;
  maxHeight?: number; // Max height for dropdown in pixels
  clearable?: boolean;
}

// ========================================
// COMPONENT
// ========================================

function AutocompleteComponent<T = any>(
  props: AutocompleteProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const {
    label,
    error = "",
    helperText,
    fullWidth = false,
    size = "medium",
    variant = "primary",
    placeholder = "Search...",
    options = [],
    value = [],
    onChange,
    onBlur,
    disabled = false,
    required = false,
    className = "",
    icon,
    id,
    name,
    renderOption,
    filterOptions,
    noOptionsText = "No results found",
    maxTags,
    maxHeight = 200,
    clearable = true,
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const autocompleteId =
    id || `autocomplete-${Math.random().toString(36).substr(2, 9)}`;

  // Selected options
  const selectedOptions = useMemo(() => {
    return options.filter((opt) => value.includes(opt.value));
  }, [options, value]);

  // Filtered options
  const filteredOptions = useMemo(() => {
    let filtered = options.filter((opt) => !value.includes(opt.value));

    if (filterOptions) {
      filtered = filterOptions(filtered, inputValue, value);
    } else if (inputValue) {
      const query = inputValue.toLowerCase();
      filtered = filtered.filter((opt) =>
        opt.label.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [options, value, inputValue, filterOptions]);

  // Update dropdown position
  const updateDropdownPosition = useCallback(() => {
    if (dropdownRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      dropdownRef.current.style.top = `${rect.bottom + window.scrollY + 4}px`;
      dropdownRef.current.style.left = `${rect.left + window.scrollX}px`;
      dropdownRef.current.style.width = `${rect.width}px`;
    }
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update position when opened and on scroll
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(-1);
      updateDropdownPosition();

      const handleScroll = () => updateDropdownPosition();
      const handleResize = () => updateDropdownPosition();

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isOpen, updateDropdownPosition]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (!isOpen) {
        setIsOpen(true);
      }
    },
    [isOpen]
  );

  const handleInputFocus = useCallback(() => {
    if (!disabled) {
      setIsFocused(true);
      setIsOpen(true);
    }
  }, [disabled]);

  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      setIsFocused(false);
      if (onBlur) {
        onBlur();
      }
    }, 200);
  }, [onBlur]);

  const handleSelect = useCallback(
    (option: AutocompleteOption<T>) => {
      if (option.disabled || disabled) return;

      const newValue = [...value, option.value];
      onChange?.(newValue);
      setInputValue("");
      setFocusedIndex(-1);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    },
    [value, onChange, disabled]
  );

  const handleRemove = useCallback(
    (optionValue: string) => {
      if (disabled) return;
      const newValue = value.filter((v) => v !== optionValue);
      onChange?.(newValue);
    },
    [value, onChange, disabled]
  );

  const handleClear = useCallback(() => {
    if (disabled) return;
    onChange?.([]);
    setInputValue("");
    inputRef.current?.focus();
  }, [onChange, disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          }
          break;

        case "Enter":
          e.preventDefault();
          if (isOpen && focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            handleSelect(filteredOptions[focusedIndex]);
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          inputRef.current?.blur();
          break;

        case "Backspace":
          if (inputValue === "" && value.length > 0) {
            e.preventDefault();
            handleRemove(value[value.length - 1]);
          }
          break;

        default:
          break;
      }
    },
    [
      disabled,
      isOpen,
      focusedIndex,
      filteredOptions,
      inputValue,
      value,
      handleSelect,
      handleRemove,
    ]
  );

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  const showMaxTagsIndicator = maxTags && value.length > maxTags;
  const displayedTags = maxTags
    ? selectedOptions.slice(0, maxTags)
    : selectedOptions;

  // Variant colors for tags
  const variantClasses = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary: "bg-secondary-500 text-white hover:bg-secondary-600",
  };

  const tagColorClass = variantClasses[variant];

  return (
    <div
      ref={containerRef}
      className={cn(
        fullWidth ? "w-full" : "inline-block",
        "helpervia-autocomplete"
      )}
    >
      {/* Label */}
      {label && (
        <Label
          htmlFor={autocompleteId}
          required={required}
          disabled={disabled}
          error={error ? true : false}
        >
          {label}
        </Label>
      )}

      {/* FormControl Container */}
      <FormControl
        size={size}
        error={error ? true : false}
        isFocused={isFocused || isOpen}
        disabled={disabled}
        fullWidth={fullWidth}
        className={cn("cursor-text overflow-hidden", className)}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Icon */}
        {icon && (
          <div className="pl-3 text-gray-400 flex items-center shrink-0">
            {icon}
          </div>
        )}

        {/* Content Wrapper - horizontal scroll for tags */}
        <div className="flex-1 flex gap-1.5 items-center m-1 px-3 min-h-[24px] overflow-x-auto overflow-y-hidden helpervia-autocomplete-tags">
          <style jsx>{`
            div::-webkit-scrollbar {
              height: 4px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background: #d1d5db;
              border-radius: 2px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #9ca3af;
            }
          `}</style>

          {/* Selected Tags */}
          {displayedTags.map((option) => (
            <div
              key={option.value}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md font-medium shrink-0",
                "transition-all duration-200 helpervia-autocomplete-tag",
                tagColorClass,
                size === "small" && "text-xs px-2 py-0.5",
                size === "medium" && "text-sm px-2.5 py-1",
                size === "large" && "text-sm px-3 py-1.5"
              )}
            >
              <span className="whitespace-nowrap">{option.label}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option.value);
                }}
                disabled={disabled}
                className={cn(
                  "hover:bg-white/20 rounded transition-colors shrink-0",
                  "flex items-center justify-center p-0.5 cursor-pointer",
                  "helpervia-autocomplete-tag-remove",
                  disabled && "cursor-not-allowed"
                )}
                aria-label={`Remove ${option.label}`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Max Tags Indicator */}
          {showMaxTagsIndicator && (
            <div
              className={cn(
                "inline-flex items-center rounded-md font-medium shrink-0",
                "bg-gray-200 text-gray-700 helpervia-autocomplete-max-indicator",
                size === "small" && "text-xs px-2 py-0.5",
                size === "medium" && "text-sm px-2.5 py-1",
                size === "large" && "text-sm px-3 py-1.5"
              )}
            >
              +{value.length - maxTags!}
            </div>
          )}

          {/* Input */}
          <input
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === "function") {
                ref(el);
              } else if (ref) {
                ref.current = el;
              }
            }}
            id={autocompleteId}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={value.length === 0 ? placeholder : ""}
            className={cn(
              "flex-1 min-w-[80px] border-none outline-none bg-transparent",
              "text-gray-900 placeholder-gray-400 helpervia-autocomplete-input",
              "disabled:text-gray-500 disabled:cursor-not-allowed",
              size === "small" && "text-xs py-1",
              size === "medium" && "text-sm py-1.5",
              size === "large" && "text-base py-2"
            )}
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={`${autocompleteId}-listbox`}
            aria-autocomplete="list"
          />
        </div>

        {/* Clear Button */}
        {clearable && value.length > 0 && !disabled && (
          <div className="pr-3 text-gray-400 flex items-center shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className={cn(
                "flex items-center justify-center text-gray-400",
                "hover:text-gray-600 hover:bg-gray-100 rounded transition-colors",
                "p-1 helpervia-autocomplete-clear"
              )}
              aria-label="Clear all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Hidden input */}
        <input type="hidden" name={name} value={JSON.stringify(value)} />
      </FormControl>

      {/* Dropdown - Fixed position, high z-index */}
      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          id={`${autocompleteId}-listbox`}
          role="listbox"
          className={cn(
            "fixed z-[9999] bg-white border border-gray-300 rounded-lg shadow-lg",
            "overflow-y-auto helpervia-autocomplete-dropdown"
          )}
          style={{
            maxHeight: `${maxHeight}px`,
          }}
        >
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500 text-sm helpervia-autocomplete-no-results">
              {noOptionsText}
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const isFocused = index === focusedIndex;
              const isDisabled = option.disabled;

              return (
                <div
                  key={option.value}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  role="option"
                  aria-selected={isFocused}
                  aria-disabled={isDisabled}
                  onClick={() => !isDisabled && handleSelect(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={cn(
                    "px-4 py-2.5 cursor-pointer transition-colors text-sm",
                    "border-b border-gray-100 last:border-b-0",
                    "first:rounded-t-lg last:rounded-b-lg",
                    "helpervia-autocomplete-option",
                    isFocused &&
                      !isDisabled &&
                      "bg-orange-50 helpervia-autocomplete-option-focused",
                    isDisabled &&
                      "opacity-50 cursor-not-allowed bg-gray-50 helpervia-autocomplete-option-disabled"
                  )}
                >
                  {renderOption ? renderOption(option) : option.label}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Helper Text / Error */}
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

export const Autocomplete = forwardRef(AutocompleteComponent) as <T = any>(
  props: AutocompleteProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof AutocompleteComponent>;

export default Autocomplete;
