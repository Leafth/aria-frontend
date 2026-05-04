import { Button, InputField } from "@/shared";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { useState } from "react";

export function CoverageForm() {
  const [origin, setOrigin] = useState("local");
  return (
    <form className="flex flex-col gap-5 p-5">
      <div>
        <h1 className="font-medium text-xl">Registro de Cobertura</h1>
        <p className="text-gray-500 text-sm">
          Registrar Cobertura: Monta Natural ou IA
        </p>
      </div>
      <InputField label="Código*" placeholder="ex: BR-044" />
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
      <Button className="w-full">Confirmar Cobertura</Button>
    </form>
  );
}
