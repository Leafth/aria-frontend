import { useState } from "react";
import type { TextareaHTMLAttributes } from "react";
import {
  container,
  textareaWrapper,
  textareaBase,
  textareaError,
  labelStyle,
  counter,
} from "./TextareaField.styles";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  maxLength?: number;
}

export function TextareaField({
  label,
  error,
  maxLength = 200,
  className = "",
  ...props
}: Props) {
  const [value, setValue] = useState("");

  return (
    <div className={container}>
      <div className={textareaWrapper}>
        <textarea
          value={value}
          maxLength={maxLength}
          className={`${textareaBase} ${
            error ? textareaError : ""
          } ${className}`}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange?.(e);
          }}
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
