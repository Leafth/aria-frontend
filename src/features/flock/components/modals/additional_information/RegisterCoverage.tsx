import { InputField } from "@/shared";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { useState } from "react";

export function RegisterCoverage() {
  const [origin, setOrigin] = useState("local");

  return (
    <div className="flex flex-col gap-3 w-86 mt-4">
      <h1 className="font-medium text-xl">Registro de Cobertura</h1>

      <p className="text-gray-500 text-xs">
        Registrar Cobertura: Monta Natural ou IA
      </p>

      <InputField label="Data da Cobertura" type="date" />

      <ToggleField
        label="Tipo de Cobertura"
        value={origin}
        onChange={setOrigin}
        options={[
          { label: "Monta Natural", value: "local" },
          { label: "Inseminação Artificial", value: "company" },
        ]}
      />

      <SelectField
        label="Reprodutor"
        options={[
          { label: "Touro1", value: "1" },
          { label: "Touro2", value: "2" },
          { label: "Touro3", value: "3" },
        ]}
      />
    </div>
  );
}
