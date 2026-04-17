import type { ReactNode, FormHTMLAttributes } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export function Form({ children, className = "", ...props }: FormProps) {
  return (
    <form className={`w-full flex flex-col gap-4 ${className}`} {...props}>
      {children}
    </form>
  );
}
