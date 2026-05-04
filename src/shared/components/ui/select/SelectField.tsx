import { ChevronDown, CircleX } from "lucide-react";
import type { SelectFieldProps } from "./SelectField.types";
import {
  container,
  selectWrapper,
  selectBase,
  selectError,
  icon,
} from "./SelectField.styles";

export function SelectField({
  label,
  error,
  options,
  className = "",
  value,
  onChange,
  ...props
}: SelectFieldProps) {
  return (
    <div className={container}>
      <div className={selectWrapper}>
        <select
          value={value ?? ""}
          className={`${selectBase} ${error ? selectError : ""} ${className}`}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        >
          <option value="" hidden>
            {label}
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown className={icon} size={18} />
      </div>

      {error && (
        <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
          <CircleX className="w-5 h-5" />
          <p>{error}</p>
        </span>
      )}
    </div>
  );
}
