import { Button, InputField, Modal } from "../../../shared";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
}

export function ModalForm({ open, onClose }: ModalFormProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Cadastrar Empresa"
      footerContent={<Button className="w-full">Cadastrar</Button>}
    >
      <InputField label="Nome da Empresa" placeholder="ex: Strong Taurus" />

      <InputField
        label="Descrição"
        placeholder="ex: Empresa da Santa Catarina"
      />
    </Modal>
  );
}
