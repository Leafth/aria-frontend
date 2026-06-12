import { X } from "lucide-react";
import { Button, InputField, Modal } from "@/shared";
import type { CowReproductiveStatus } from "../../types/cow.types";
import { useBreeds } from "@/features/reproductive-support/hooks/useBreed";
export interface ModalFilterValues {
  birth_from?: string;
  birth_to?: string;
  weight_from?: string;
  weight_to?: string;
  reproductive_status?: CowReproductiveStatus;
  breed_id?: string;
}

interface ModalFilterProps {
  open: boolean;
  onClose: () => void;
  filters: ModalFilterValues;
  onChange: (filters: ModalFilterValues) => void;
  onApply: () => void;
}

const STAGE_OPTIONS: {
  label: string;
  value: CowReproductiveStatus;
}[] = [
  {
    label: "Aguardando Cio",
    value: "open",
  },
  {
    label: "Em Cio",
    value: "in_heat",
  },
  {
    label: "Cobertura Realizada",
    value: "inseminated",
  },
  {
    label: "Prenha",
    value: "pregnant",
  },
  {
    label: "Pós-Parto",
    value: "postpartum",
  },
];

export function ModalFilter({
  open,
  onClose,
  filters,
  onChange,
  onApply,
}: ModalFilterProps) {
  function updateFilter<K extends keyof ModalFilterValues>(
    key: K,
    value: ModalFilterValues[K],
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  function handleSelectStage(value: CowReproductiveStatus) {
    const isSelected = filters.reproductive_status === value;

    updateFilter("reproductive_status", isSelected ? undefined : value);
  }

  function clearBirthDateFilter() {
    onChange({
      ...filters,
      birth_from: undefined,
      birth_to: undefined,
    });
  }

  function clearWeightFilter() {
    onChange({
      ...filters,
      weight_from: undefined,
      weight_to: undefined,
    });
  }

  const { data: breeds = [] } = useBreeds();

  const hasBirthDateFilter = Boolean(filters.birth_from || filters.birth_to);
  const hasWeightFilter = Boolean(filters.weight_from || filters.weight_to);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Filtros"
      className="max-w-2xl"
      footerContent={
        <Button className="w-full" onClick={onApply}>
          Aplicar Filtros
        </Button>
      }
    >
      <div className="flex flex-col gap-5 px-2 pb-2">
        <section className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-gray-800">Etapa</h3>

          <div className="flex flex-col items-start gap-5">
            {STAGE_OPTIONS.map((stage) => {
              const isSelected = filters.reproductive_status === stage.value;

              return (
                <button
                  key={stage.value}
                  type="button"
                  onClick={() => handleSelectStage(stage.value)}
                  className={`rounded-md px-2 py-1 text-left text-sm transition cursor-pointer ${
                    isSelected
                      ? "bg-gray-100 font-semibold text-gray-950"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {stage.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-gray-800">
            Data de Nascimento
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              label="Data de Início"
              type="date"
              value={filters.birth_from ?? ""}
              onChange={(event) =>
                updateFilter("birth_from", event.target.value)
              }
            />

            <InputField
              label="Data de Fim"
              type="date"
              value={filters.birth_to ?? ""}
              onChange={(event) => updateFilter("birth_to", event.target.value)}
            />
          </div>

          {hasBirthDateFilter && (
            <button
              type="button"
              onClick={clearBirthDateFilter}
              className="flex w-fit items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300 cursor-pointer"
            >
              Limpar Filtro
              <X className="h-4 w-4" />
            </button>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-gray-800">Peso</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              label="Peso Inicial (kg)"
              type="number"
              inputMode="decimal"
              value={filters.weight_from ?? ""}
              onChange={(event) =>
                updateFilter("weight_from", event.target.value)
              }
            />

            <InputField
              label="Peso Final (kg)"
              type="number"
              inputMode="decimal"
              value={filters.weight_to ?? ""}
              onChange={(event) =>
                updateFilter("weight_to", event.target.value)
              }
            />
          </div>

          {hasWeightFilter && (
            <button
              type="button"
              onClick={clearWeightFilter}
              className="flex w-fit items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300 cursor-pointer"
            >
              Limpar Filtro
              <X className="h-4 w-4" />
            </button>
          )}
        </section>
        <section className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-gray-800">Raça</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            <select
              value={filters.breed_id ?? ""}
              onChange={(event) =>
                updateFilter("breed_id", event.target.value || undefined)
              }
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-support-teal cursor-pointer"
            >
              <option value="">Selecione</option>

              {breeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </select>
          </div>

          {filters.breed_id && (
            <button
              type="button"
              onClick={() => updateFilter("breed_id", undefined)}
              className="flex w-fit items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300 cursor-pointer"
            >
              Limpar Filtro
              <X className="h-4 w-4" />
            </button>
          )}
        </section>
      </div>
    </Modal>
  );
}
