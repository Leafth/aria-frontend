import { X } from "lucide-react";
import type { ModalProps } from "./Modal.types";
import {
  overlay,
  modal,
  header,
  title,
  closeButton,
  content,
  footer,
} from "./Modal.styles";

export function Modal({
  open,
  onClose,
  title: modalTitle,
  children,
  footerContent,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className={overlay}>
      <div className={modal} onClick={(e) => e.stopPropagation()}>
        <div className={header}>
          <button className={closeButton} onClick={onClose}>
            <X size={20} />
          </button>
          <h2 className={title}>{modalTitle}</h2>
          <div className="w-5" />
        </div>

        <div className={content}>{children}</div>

        {footerContent && <div className={footer}>{footerContent}</div>}
      </div>
    </div>
  );
}
