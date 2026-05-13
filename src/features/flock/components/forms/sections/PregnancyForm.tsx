import { Button, InputField } from "@/shared";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { useState } from "react";

export function PregnancyForm() {
  const [origin, setOrigin] = useState("positive");

  return (
    <form className="flex flex-col gap-5">
      <div>
        <h1 className="font-medium text-xl">Confirmar Prenhez</h1>
        <p className="text-gray-500 text-sm">
          Registrar resultado de prenhez via ultrassom
        </p>
      </div>
      <InputField label="Data do Exame" type="date" />

      <ToggleField
        label="Resultado do Exato"
        value={origin}
        onChange={setOrigin}
        options={[
          { label: "Positivo", value: "positive" },
          { label: "Negativo", value: "negative" },
        ]}
      />
      <Button className="w-full">Confirmar Parto</Button>
    </form>
  );
}
