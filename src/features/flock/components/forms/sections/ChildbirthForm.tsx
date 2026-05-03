import { Button, InputField } from "@/shared";
import { TextareaField } from "@/shared/components/ui/textarea/Textarea";

export function ChildbirthForm() {
  return (
    <form className="flex flex-col gap-5 p-5">
      <div>
        <h1 className="font-medium text-xl">Registrar Parto</h1>
        <p className="text-gray-500 text-sm">
          Registrar os dados do parto realizado
        </p>
      </div>
      <InputField label="Código*" placeholder="ex: BR-044" />
      <TextareaField
        label="Observações (opcional)"
        placeholder="Adicione informações relevantes sobre o parto..."
      />
      <Button className="w-full">Confirmar Parto</Button>
    </form>
  );
}
