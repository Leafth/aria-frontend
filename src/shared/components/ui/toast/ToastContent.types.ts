export type ToastVariant = "success" | "error" | "info";

export interface ToastContentProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
}