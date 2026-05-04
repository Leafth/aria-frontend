import { InputField } from "@/shared";

export function RegisterCio() {
  return (
    <div className="flex flex-col gap-3 w-86 mt-4">
      <h1 className="font-medium text-xl">Registrar Cio</h1>
      <p className="text-gray-500 text-xs">
        Registrar cio e visualizar estimativa do próximo ciclo
      </p>
      <InputField
        label="Data do Cio"
        type="date"
      />
      <p className="text-gray-500 text-xs">
        Data de identificação do cio
      </p>
    </div>
  );
}
