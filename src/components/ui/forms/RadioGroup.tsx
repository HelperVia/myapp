import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Label } from "./Label";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
};

// ========================================
// TYPES
// ========================================

interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

type ColorVariant = "primary" | "secondary" | "gray" | "destructive";
type SizeVariant = "small" | "medium" | "large"; // ✅ Changed to match TextField/Select
type OrientationVariant = "vertical" | "horizontal";
type ItemStyleVariant = "default" | "card" | "inline";

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  helperText?: string; // ✅ Changed from "description" to "helperText"
  error?: string;
  required?: boolean;
  disabled?: boolean;
  color?: ColorVariant;
  size?: SizeVariant;
  orientation?: OrientationVariant; // ✅ Already exists! vertical | horizontal
  itemStyle?: ItemStyleVariant;
  fullWidth?: boolean; // ✅ Added
  className?: string;
}

interface RadioGroupRef {
  focus: () => void;
  blur: () => void;
}

// ========================================
// COLOR CLASSES TYPE
// ========================================

interface ColorClassConfig {
  border: string;
  bg: string;
  hover: string;
  cardBorder: string;
  cardBg: string;
}

interface SizeClassConfig {
  button: string;
  inner: string;
  text: string;
}

/**
 * RadioGroup Component with Tailwind CSS
 * React Hook Form Compatible with forwardRef
 * TypeScript Support
 */
export const RadioGroup = forwardRef<RadioGroupRef, RadioGroupProps>(
  (
    {
      name,
      options = [],
      value,
      onChange,
      onBlur,
      label,
      helperText, // ✅ Changed from "description"
      error,
      required = false,
      disabled = false,
      color = "primary",
      size = "medium", // ✅ Changed from "default" to "medium"
      orientation = "vertical",
      itemStyle = "default",
      fullWidth = false, // ✅ Added with default
      className = "",
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState<string>(value || "");

    // Sync internal state with external value
    useEffect(() => {
      setSelectedValue(value || "");
    }, [value]);

    const handleChange = (optionValue: string): void => {
      if (disabled) return;
      setSelectedValue(optionValue);
      if (onChange) {
        onChange(optionValue);
      }
    };

    const handleBlur = (): void => {
      if (onBlur) {
        onBlur();
      }
    };

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      focus: () => {
        // Focus on first option
        const firstOption = document.querySelector<HTMLElement>(
          `[name="${name}"]`
        );
        if (firstOption) firstOption.focus();
      },
      blur: handleBlur,
    }));

    // ========================================
    // COLOR CLASSES
    // ========================================
    const colorClasses: Record<ColorVariant, ColorClassConfig> = {
      primary: {
        border: "border-[#e7411b]",
        bg: "bg-[#e7411b]",
        hover: "hover:border-[#d13916]",
        cardBorder:
          "hover:border-[#e7411b] data-[selected=true]:border-[#e7411b]",
        cardBg: "hover:bg-orange-50 data-[selected=true]:bg-orange-50",
      },
      secondary: {
        border: "border-[#1c252e]",
        bg: "bg-[#1c252e]",
        hover: "hover:border-[#0f172a]",
        cardBorder:
          "hover:border-[#1c252e] data-[selected=true]:border-[#1c252e]",
        cardBg: "hover:bg-slate-100 data-[selected=true]:bg-slate-100",
      },
      gray: {
        border: "border-gray-400",
        bg: "bg-gray-600",
        hover: "hover:border-gray-600",
        cardBorder:
          "hover:border-gray-500 data-[selected=true]:border-gray-500",
        cardBg: "hover:bg-gray-50 data-[selected=true]:bg-gray-50",
      },
      destructive: {
        border: "border-red-500",
        bg: "bg-red-500",
        hover: "hover:border-red-600",
        cardBorder: "hover:border-red-500 data-[selected=true]:border-red-500",
        cardBg: "hover:bg-red-50 data-[selected=true]:bg-red-50",
      },
    };

    // ========================================
    // SIZE CLASSES - Same as TextField/Select/InputNumber
    // ========================================
    const sizeClasses: Record<SizeVariant, SizeClassConfig> = {
      small: {
        button: "w-4 h-4",
        inner: "w-2 h-2",
        text: "text-sm",
      },
      medium: {
        button: "w-5 h-5",
        inner: "w-2.5 h-2.5",
        text: "text-sm",
      },
      large: {
        button: "w-6 h-6",
        inner: "w-3 h-3",
        text: "text-sm",
      },
    };

    const currentColor = colorClasses[color];
    const currentSize = sizeClasses[size];

    // ========================================
    // GROUP CONTAINER CLASSES
    // ========================================
    const groupClasses = cn(
      "flex gap-3",
      orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col"
    );

    // ========================================
    // ITEM CONTAINER CLASSES
    // ========================================
    const getItemClasses = (option: RadioOption): string => {
      const isSelected = selectedValue === option.value;
      const isDisabled = option.disabled || disabled;

      const baseClasses =
        "flex items-center gap-3 cursor-pointer rounded-lg transition-all";
      const defaultClasses =
        itemStyle === "default" ? "p-1 hover:bg-slate-50" : "";
      const inlineClasses =
        itemStyle === "inline"
          ? "p-2 px-3 border border-transparent hover:border-slate-200"
          : "";
      const disabledClasses = isDisabled
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "";

      // Card style classes
      let cardClasses = "";
      if (itemStyle === "card") {
        const borderClass = isSelected
          ? getBorderColorClass()
          : "border-slate-200";
        const bgClass = isSelected
          ? getBackgroundColorClass()
          : "hover:bg-slate-50";
        cardClasses = `border-2 p-4 rounded-xl transition-colors ${borderClass} ${bgClass}`;
      }

      return cn(
        baseClasses,
        defaultClasses,
        cardClasses,
        inlineClasses,
        disabledClasses
      );
    };

    // Helper functions for card colors
    const getBorderColorClass = (): string => {
      switch (color) {
        case "primary":
          return "border-[#e7411b]";
        case "secondary":
          return "border-[#1c252e]";
        case "gray":
          return "border-gray-500";
        case "destructive":
          return "border-red-500";
        default:
          return "border-[#e7411b]";
      }
    };

    const getBackgroundColorClass = (): string => {
      switch (color) {
        case "primary":
          return "bg-orange-50";
        case "secondary":
          return "bg-slate-100";
        case "gray":
          return "bg-gray-50";
        case "destructive":
          return "bg-red-50";
        default:
          return "bg-orange-50";
      }
    };

    // ========================================
    // RADIO BUTTON CLASSES
    // ========================================
    const getButtonClasses = (option: RadioOption): string => {
      const isSelected = selectedValue === option.value;

      return cn(
        "rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
        //                                                                      ↑ removed mt-0.5
        currentSize.button,
        currentColor.border,
        !isSelected && currentColor.hover
      );
    };

    return (
      <div className={cn(fullWidth ? "w-full" : "", className)}>
        {/* LABEL - Using Label Component as div (no native input) */}
        {label && (
          <Label
            as="div"
            required={required}
            disabled={disabled}
            error={!!error}
          >
            {label}
          </Label>
        )}

        {/* RADIO GROUP */}
        <div className={groupClasses} onBlur={handleBlur}>
          {options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <div
                key={option.value}
                className={getItemClasses(option)}
                onClick={() =>
                  !option.disabled && !disabled && handleChange(option.value)
                }
                data-selected={isSelected}
                role="radio"
                aria-checked={isSelected}
                tabIndex={option.disabled || disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!option.disabled && !disabled) {
                      handleChange(option.value);
                    }
                  }
                }}
              >
                {/* RADIO BUTTON */}
                <div className={getButtonClasses(option)}>
                  {isSelected && (
                    <div
                      className={cn(
                        "rounded-full transition-all",
                        currentSize.inner,
                        currentColor.bg
                      )}
                    />
                  )}
                </div>

                {/* LABEL & DESCRIPTION */}
                <div className="flex-1">
                  <div
                    className={cn(
                      "font-medium text-gray-900 flex items-center gap-2",
                      //                ↑ text-gray-900 same as TextField
                      currentSize.text
                    )}
                  >
                    {option.icon && (
                      <span className="text-lg">{option.icon}</span>
                    )}
                    <span>{option.label}</span>
                  </div>
                  {option.description && (
                    <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {/* ↑ text-gray-500 same as TextField helperText */}
                      {option.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* HELPER TEXT / ERROR - Same as TextField/Select/InputNumber */}
        {(helperText || error) && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              error ? "text-error font-medium" : "text-gray-500"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;

// Export types for external use
export type { RadioGroupProps, RadioGroupRef, RadioOption };
