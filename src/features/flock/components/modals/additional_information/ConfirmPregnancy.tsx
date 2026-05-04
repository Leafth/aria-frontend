import { InputField } from "@/shared";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { useState } from "react";

export function ConfirmPregnancy() {
  const [origin, setOrigin] = useState("positive");
  return (
    <div className="flex flex-col gap-3 w-86 mt-4">
      <h1 className="font-medium text-xl">Confirmar Prenhez</h1>

      <p className="text-gray-500 text-xs">
        Registrar confirmação de prenhez via ultrassom
      </p>

      <InputField label="Data do Exame" type="date" />

      <ToggleField
        label="Resultado do Exame"
        value={origin}
        onChange={setOrigin}
        options={[
          { label: "Positivo", value: "positive" },
          { label: "Negativo", value: "negative" },
        ]}
      />
    </div>
  );
}
