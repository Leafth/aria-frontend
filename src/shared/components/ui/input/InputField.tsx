import { useState } from "react";
import { Eye, EyeOff, CircleX } from "lucide-react";
import type { InputFieldProps } from "./InputField.types";
import {
  container,
  inputBase,
  inputError,
  inputWrapper,
  labelStyle,
  iconButton,
} from "./InputField.styles";

export function InputField({
  label,
  error,
  type = "text",
  showPasswordToggle,
  className = "",
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={container}>
      <div className={inputWrapper}>
        <input
          type={inputType}
          className={`${inputBase} ${error ? inputError : ""} ${className}`}
          {...props}
        />

        {label && <label className={labelStyle}>{label}</label>}

        {isPassword && showPasswordToggle && (
          <span
            className={iconButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </span>
        )}
      </div>

      {error && (
        <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
          <CircleX className="w-5 h-5"/>
          <p>{error}</p>
        </span>
      )}
    </div>
  );
}
