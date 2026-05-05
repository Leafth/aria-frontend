import type { TextareaHTMLAttributes } from "react";
import {
  container,
  textareaWrapper,
  textareaBase,
  textareaError,
  labelStyle,
  counter,
} from "./TextareaField.styles";

interface Props extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> {
  label?: string;
  error?: string;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export function TextareaField({
  label,
  error,
  maxLength = 200,
  className = "",
  value = "",
  onChange,
  ...props
}: Props) {
  return (
    <div className={container}>
      <div className={textareaWrapper}>
        <textarea
          value={value}
          maxLength={maxLength}
          className={`${textareaBase} ${
            error ? textareaError : ""
          } ${className}`}
          onChange={(e) => onChange?.(e.target.value)}
          {...props}
        />

        {label && <label className={labelStyle}>{label}</label>}

        <span className={counter}>
          {value.length}/{maxLength}
        </span>
      </div>

      {error && (
        <span className="text-red-500 text-xs font-medium">{error}</span>
      )}
    </div>
  );
}
