import type { EditCowFormData } from "../../../../schemas/editCow.schema";

export interface EditCowModalProps {
  open: boolean;
  onClose: () => void;
  cowId: string;
  initialData?: EditCowFormData | null;
}
