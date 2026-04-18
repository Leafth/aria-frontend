import { Button, Header } from "../../../../shared";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ModalForm } from "../../components/ModalForm";

export default function ReproductiveSupportPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <Header
        title="Apoio Reprodutivo"
        description="Touros e empresas fornecedoras de sêmen"
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <span className="text-sm text-text-primary">Tipo:</span>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-gray-200 text-sm">
              Touro
            </button>

            <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm">
              Empresa
            </button>
          </div>
        </div>
        <Button className="w-full flex items-center justify-center gap-2 lg:w-auto" onClick={() => setOpen(true)}>
          <Plus size={18} />
          Cadastrar Empresa
        </Button>
      </div>
      {open && (
        <ModalForm open={open} onClose={() => setOpen(false)}/>
      )}
    </div>
  );
}
