export interface Option {
  id: string;
  name: string;
}

export interface ComboboxValue {
  breed_id?: string;
  breed_name?: string;
}

export interface ComboboxProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: ComboboxValue;
  error?: string;
  disabled?: boolean;
  onChange: (value: ComboboxValue) => void;
}
