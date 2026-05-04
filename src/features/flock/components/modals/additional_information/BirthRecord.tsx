import { InputField } from "@/shared";

export function BirthRecord() {
  return (
    <div className="flex flex-col gap-3 w-86 mt-4">
      <h1 className="font-medium text-xl">Registro de Parto</h1>
      <p className="text-gray-500 text-xs">
        Registrar parto
      </p>
      <InputField label="Data do Parto" type="date" />
      <p className="text-gray-500 text-xs">Data em que o parto ocorreu</p>
    </div>
  );
}
