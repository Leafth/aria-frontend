import { Button, Header } from "@/shared";
import { CirclePlus, Search } from "lucide-react";
import { ItemsFilter } from "../../components/cards-filter/ItemsFilter";
import { FlockCard } from "../../components/flock-card/FlockCard";
import { flocksMock } from "../../components/flock-card/itemsFlock.mock";
import { useState } from "react";
import { ModalForm } from "../../components/modals/ModalForm";
import { Input } from "@/components/ui/input";

export default function FlockPage() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  return (
    <main className="flex flex-col gap-6 p-4 w-full">
      <header className="flex justify-between items-center">
        <Header title="Rebanho" description="44 animais ativos" />
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
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {flocksMock
            .filter((flock) => {
              const matchesPhase = filter === "Todas" || flock.phase === filter;

              const matchesSearch =
                flock.name.toLowerCase().includes(search.toLowerCase()) ||
                flock.code.toLowerCase().includes(search.toLowerCase());

              return matchesPhase && matchesSearch;
            })
            .map((flock) => (
              <FlockCard
                key={flock.code}
                name={flock.name}
                code={flock.code}
                breed={flock.breed}
                phase={flock.phase}
                age={flock.age}
                weight={flock.weight}
                goal={flock.goal}
                goalWeight={flock.goalWeight}
                colorCard={flock.colorCard}
              />
            ))}
        </div>
        <ModalForm open={openModal} onClose={() => setOpenModal(false)} />
      </section>
    </main>
  );
}
