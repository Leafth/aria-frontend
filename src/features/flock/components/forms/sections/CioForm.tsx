import { Button, InputField } from "@/shared";

export function CioForm() {
  return (
    <form className="flex flex-col gap-5 p-5">
      <div>
        <h1 className="font-medium text-xl">Registrar Cio</h1>
        <p className="text-gray-500 text-sm">
          Registrar os dados do parto realizado
        </p>
      </div>
      <InputField label="Código*" placeholder="ex: BR-044" />
      <Button className="w-full">Confirmar Cio</Button>
    </form>
  );
}
