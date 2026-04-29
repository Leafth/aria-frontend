import type { SelectHTMLAttributes } from "react";

export interface Option {
  label: string;
  value: string;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
}
