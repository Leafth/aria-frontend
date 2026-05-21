import { useState } from "react";
import { Button } from "@/shared";
import { RecentHistoryCard } from "../../../components/individual-record/recent-history/RecentHistoryCard";
import type { HistoryItem } from "../../../components/individual-record/recent-history/recent-history.types";
import type { HistoryFilterValue } from "@/features/flock/components/individual-record/recent-history/HistoryFilter.mock";
import { HistoryFilter } from "@/features/flock/components/individual-record/recent-history/HistoryFilter";

interface FullHistoryMainSectionProps {
  items: HistoryItem[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function FullHistoryMainSection({
  items,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: FullHistoryMainSectionProps) {
  const [filter, setFilter] = useState<HistoryFilterValue>("Todas");

  const filteredItems =
    filter === "Todas" ? items : items.filter((item) => item.type === filter);

  return (
    <section className="flex flex-col gap-5">
      <HistoryFilter value={filter} onChange={setFilter} />

      {isLoading && (
        <p className="text-sm text-gray-500">Carregando histórico...</p>
      )}

      {isError && (
        <p className="text-sm text-red-500">Erro ao carregar histórico.</p>
      )}

      {!isLoading && !isError && filteredItems.length === 0 && (
        <p className="text-sm text-gray-500">
          Nenhum evento encontrado para esse filtro.
        </p>
      )}

      {!isLoading && !isError && filteredItems.length > 0 && (
        <RecentHistoryCard
          items={filteredItems}
          showViewAllButton={false}
        />
      )}

      {hasNextPage && (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Carregando..." : "Carregar mais..."}
        </Button>
      )}

      {!hasNextPage && items.length > 0 && (
        <p className="text-sm text-gray-400 text-center">
          Todos os eventos foram carregados.
        </p>
      )}
    </section>
  );
}