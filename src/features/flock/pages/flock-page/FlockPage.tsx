import { Button, Header } from "@/shared";
import { CirclePlus, Search } from "lucide-react";
import { ItemsFilter } from "../../components/cards-filter/ItemsFilter";
import { FlockCard } from "../../components/flock-card/FlockCard";
import { useState } from "react";
import { ModalForm } from "../../components/modals/ModalForm";
import { Input } from "@/components/ui/input";
import { useCows } from "../../hooks/useCow";

import type { Cow, CowPhase } from "../../types/cow.types";

function getPhaseLabel(phase: CowPhase) {
  const labels: Record<CowPhase, string> = {
    calf: "Bezerra",
    heifer: "Garrota",
    young: "Novilha",
    primiparous: "Primípara",
    multiparous: "Multiparta",
  };

  return labels[phase];
}

function getPhaseColor(phase: CowPhase, active: boolean) {
  if (!active) return "#71717A";

  const colors: Record<CowPhase, string> = {
    calf: "#B32A9A",
    heifer: "#622BD0",
    young: "#28C2B0",
    primiparous: "#0004FF",
    multiparous: "#FF7700",
  };

  return colors[phase];
}

function filterToPhase(filter: string): CowPhase | undefined {
  const phases: Record<string, CowPhase> = {
    Bezerra: "calf",
    Garrota: "heifer",
    Novilha: "young",
    Primípara: "primiparous",
    Multiparta: "multiparous",
  };

  return phases[filter];
}

function calculateAge(birthDate: string) {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (today.getDate() < birth.getDate()) {
    months--;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years}a`;
  }

  return `${months}m`;
}

function cowToFlockCard(cow: Cow) {
  return {
    id: cow.id,
    name: cow.name,
    code: cow.ear_tag,
    breed: cow.breed,
    phase: cow.active ? getPhaseLabel(cow.phase) : "Inativa",
    age: calculateAge(cow.birth_date),
    weight: `${cow.weight}kg`,
    colorCard: getPhaseColor(cow.phase, cow.active),
  };
}

export default function FlockPage() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const selectedPhase = filterToPhase(filter);

  const activeFilter =
    filter === "Inativa" ? false : selectedPhase ? true : undefined;

  const { data, isLoading, isError } = useCows({
    q: search,
    phase: selectedPhase,
    active: activeFilter,
    page: 1,
    per_page: 20,
  });

  const cows = data?.data ?? [];
  const cards = cows.map(cowToFlockCard);

  return (
    <main className="flex flex-col gap-6 p-4 w-full">
      <header className="flex justify-between items-center">
        <Header
          title="Rebanho"
          description={`${data?.meta.total_count ?? 0} animais cadastrados`}
        />

        <Button onClick={() => setOpenModal(true)}>
          <CirclePlus size={20} />
          Cadastrar Animal
        </Button>
      </header>

      <section className="flex flex-col gap-7">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

          <Input
            placeholder="Buscar por nome ou brinco..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <ItemsFilter value={filter} onChange={setFilter} />

        {isLoading && (
          <p className="text-sm text-gray-500">Carregando animais...</p>
        )}

        {isError && (
          <p className="text-sm text-red-500">Erro ao carregar os animais.</p>
        )}

        {!isLoading && !isError && cards.length === 0 && (
          <p className="text-sm text-gray-500">Nenhum animal encontrado.</p>
        )}

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((flock) => (
            <FlockCard
              key={flock.id}
              id={flock.id}
              name={flock.name}
              code={flock.code}
              breed={flock.breed}
              phase={flock.phase}
              age={flock.age}
              weight={flock.weight}
              colorCard={flock.colorCard}
            />
          ))}
        </div>

        <ModalForm open={openModal} onClose={() => setOpenModal(false)} />
      </section>
    </main>
  );
}
