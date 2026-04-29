import { useState } from "react";
import { ChevronDown, CircleX } from "lucide-react";
import type { SelectFieldProps } from "./selectField.types";
import {
  container,
  selectWrapper,
  selectBase,
  selectError,
  icon,
} from "./selectField.styles";

export function SelectField({
  label,
  error,
  options,
  className = "",
  ...props
}: SelectFieldProps) {
  const [value, setValue] = useState("");

  return (
    <div className={container}>
      <div className={selectWrapper}>
        <select
          value={value}
          className={`${selectBase} ${error ? selectError : ""} ${className}`}
          onChange={(e) => {
            const val = e.target.value;
            setValue(val);
            props.onChange?.(e);
          }}
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
