export interface ModalFormProps {
  open: boolean;
  onClose: () => void;
}

export type ApiErrorResponse = {
  errors?: {
    ear_tag?: string[];
    name?: string[];
    birth_date?: string[];
    breed?: string[];
    weight?: string[];
    phase?: string[];
    active?: string[];
    breed_id?: string[];
    breed_name?: string[];
  };
};
