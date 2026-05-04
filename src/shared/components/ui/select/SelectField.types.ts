export interface SelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label: string;
  error?: string;
  options: {
    label: string;
    value: string | number;
  }[];
  value?: string;
  onChange?: (value: string) => void;
}