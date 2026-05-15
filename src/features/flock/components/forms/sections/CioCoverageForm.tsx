import { Button, InputField } from "@/shared";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { useState } from "react";

export function CioCoverageForm() {
  const [coverage, setCoverage] = useState("no_coverage");
  const [mount, setMount] = useState("local");
  
  return (
    <form className="flex flex-col gap-5">
      <div>
        <h1 className="font-medium text-xl">Registrar Cio e Cobertura</h1>
        <p className="text-gray-500 text-sm">
          Registrar dados para confirmar cio
        </p>
      </div>
      <ToggleField
        label="Tipo de Cobertura"
        value={coverage}
        onChange={setCoverage}
        options={[
          { label: "Sem Cobertura", value: "no_coverage" },
          { label: "Com Cobertura", value: "yes_coverage" },
        ]}
      />
      <InputField label="Data do Cio" type="date" />
      <ToggleField
        label="Tipo de Cobertura"
        value={mount}
        onChange={setMount}
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
