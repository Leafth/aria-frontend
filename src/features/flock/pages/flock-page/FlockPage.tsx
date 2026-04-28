import { Button, Header } from "@/shared";
import { DataTableTextFilter } from "@/shared/components/ui/table/DataTableTextFilter";
import { CirclePlus } from "lucide-react";
import { ItemsFilter } from "../../components/cards-filter/ItemsFilter";
import { FlockCard } from "../../components/flock-card/FlockCard";
import { flocksMock } from "../../components/flock-card/itemsFlock.mock";
import { useState } from "react";
import { ModalForm } from "../../components/modals/ModalForm";

export default function FlockPage() {
  const [filter, setFilter] = useState("Todas");
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
        <DataTableTextFilter placeholder="Pesquisar..." />
        <ItemsFilter value={filter} onChange={setFilter} />
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ml-8">
          {flocksMock
            .filter((flock) => {
              if (filter === "Todas") return true;
              return flock.phase === filter;
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
                alerts={flock.alerts}
                goal={flock.goal}
                currentWeight={flock.currentWeight}
                goalWeight={flock.goalWeight}
                lastWeighing={flock.lastWeighing}
                events={flock.events}
                colorCard={flock.colorCard}
              />
            ))}
        </div>
        <ModalForm open={openModal} onClose={() => setOpenModal(false)} />
      </section>
    </main>
  );
}
