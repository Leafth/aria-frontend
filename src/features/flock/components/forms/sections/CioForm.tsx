import { Button, InputField } from "@/shared";

export function CioForm() {
  return (
    <form className="flex flex-col gap-5">
      <div>
        <h1 className="font-medium text-xl">Registrar Cio</h1>
        <p className="text-gray-500 text-sm">
          Registrar dados para confirmar cio
        </p>
      </div>
      <InputField label="Data do Cio" type="date"/>
      <Button className="w-full">Confirmar Cio</Button>
    </form>
  );
}
