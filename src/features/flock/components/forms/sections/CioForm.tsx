import { Button, InputField } from "@/shared";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { useState } from "react";

export function CioForm() {
  const [origin, setOrigin] = useState("local");
  return (
    <form className="flex flex-col gap-5">
      <div>
        <h1 className="font-medium text-xl">Registrar Cio</h1>
        <p className="text-gray-500 text-sm">
          Registrar dados para confirmar cio
        </p>
      </div>
      <ToggleField
        label=""
        value={origin}
        onChange={setOrigin}
        options={[
          { label: "Sem Cobertura", value: "local" },
          { label: "Com Cobertura", value: "company" },
        ]}
      />
      <InputField label="Data do Cio" type="date" />
      <Button className="w-full">Confirmar Cio</Button>
    </form>
  );
}
