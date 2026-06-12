import { Button } from "@/shared";
import { RecentHistoryCard } from "../../../components/individual-record/recent-history/RecentHistoryCard";
import type { HistoryItem } from "../../../components/individual-record/recent-history/recent-history.types";
import type { HistoryFiltersValue } from "@/features/flock/components/individual-record/recent-history/HistoryFilter.mock";
import { HistoryFilter } from "@/features/flock/components/individual-record/recent-history/HistoryFilter";
interface FullHistoryMainSectionProps {
  filter: HistoryFiltersValue;
  onFilterChange: (value: HistoryFiltersValue) => void;
  items: HistoryItem[];
  isLoading: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function FullHistoryMainSection({
  filter,
  onFilterChange,
  items,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: FullHistoryMainSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <HistoryFilter value={filter} onChange={onFilterChange} />

      {isLoading && (
        <p className="text-sm text-gray-500">Carregando histórico...</p>
      )}

      {isError && (
        <p className="text-sm text-red-500">Erro ao carregar histórico.</p>
      )}

      {!isLoading && !isError && items.length === 0 && (
        <p className="text-sm text-gray-500">
          Nenhum evento encontrado para esse filtro.
        </p>
      )}

      {!isLoading && !isError && items.length > 0 && (
        <RecentHistoryCard items={items} showViewAllButton={false} />
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
