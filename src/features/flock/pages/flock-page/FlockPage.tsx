import { Button, Header } from "@/shared";
import { CirclePlus, Search } from "lucide-react";
import { ItemsFilter } from "../../components/cards-filter/ItemsFilter";
import { FlockCard } from "../../components/flock-card/FlockCard";
import { useEffect, useRef, useState } from "react";
import { ModalForm } from "../../components/modals/ModalForm";
import { Input } from "@/components/ui/input";

import { filterToPhase } from "../../utils/filterToPhase";
import { cowToFlockCard } from "../../utils/cowToFlockCard";
import { useInfiniteCows } from "../../hooks/useInfiniteCows";
import { useDebounce } from "@/hooks/useDebounce";

export default function FlockPage() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearch = useDebounce(search, 600);

  const selectedPhase = filterToPhase(filter);
  const activeFilter = filter === "Inativa" ? false : true;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCows({
    q: debouncedSearch,
    phase: selectedPhase,
    active: activeFilter,
    per_page: 10,
  });

  const cows = data?.pages.flatMap((page) => page.data) ?? [];
  const cards = cows.map(cowToFlockCard);

  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className="flex flex-col gap-6 p-4 sm:p-6 w-full">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Header
          title="Rebanho"
          description={`${totalCount} animais cadastrados`}
        />

        <Button onClick={() => setOpenModal(true)} className="w-full md:w-auto">
          <CirclePlus size={20} />
          Cadastrar Animal
        </Button>
      </header>

      <section className="flex flex-col gap-6 md:gap-7">
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

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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

        <div ref={loadMoreRef} className="min-h-10 flex justify-center">
          {isFetchingNextPage && (
            <p className="text-sm text-gray-500">Carregando mais animais...</p>
          )}

          {!hasNextPage && cards.length > 0 && (
            <p className="text-sm text-gray-400 text-center">
              Todos os animais foram carregados.
            </p>
          )}
        </div>

        <ModalForm open={openModal} onClose={() => setOpenModal(false)} />
      </section>
    </main>
  );
}
