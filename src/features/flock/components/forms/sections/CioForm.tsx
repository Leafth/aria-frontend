import { Button, InputField } from "@/shared";
import { SelectField } from "@/shared/components/ui/select/SelectField";
import { ToggleField } from "@/shared/components/ui/toggle/ToggleField";
import { useState } from "react";

export function CioForm() {
  const [coverage, setCoverage] = useState("no_coverage");
  const [mountType, setMountType] = useState("natural_mount");

  const hasCoverage = coverage === "yes_coverage";

  return (
    <form className="flex flex-col gap-5">
      <div>
        <h1 className="font-medium text-xl">
          {" "}
          {hasCoverage ? "Registar Cio e Cobertura" : "Registar Cio"}
        </h1>
        <p className="text-gray-500 text-sm">
          Registre o cio do animal e, se necessário, informe a cobertura.
        </p>
      </div>

      <ToggleField
        label="Cobertura"
        value={coverage}
        onChange={setCoverage}
        options={[
          { label: "Sem Cobertura", value: "no_coverage" },
          { label: "Com Cobertura", value: "yes_coverage" },
        ]}
      />

      <InputField label="Data do Cio" type="date" />

      {hasCoverage && (
        <>
          <ToggleField
            label="Tipo de Cobertura"
            value={mountType}
            onChange={setMountType}
            options={[
              { label: "Monta Natural", value: "natural_mount" },
              {
                label: "Inseminação Artificial",
                value: "artificial_insemination",
              },
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
        </>
      )}

      <Button className="w-full">
        {hasCoverage ? "Confirmar Cio e Cobertura" : "Confirmar Cio"}
      </Button>
    </form>
  );
}
