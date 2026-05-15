import { FlockHeader } from "./FlockHeader";
import { ModalForm } from "../../../components/modals/ModalForm";
import { useInfiniteCows } from "../../../hooks/useInfiniteCows";
import { cowToFlockCard } from "../../../utils/cowToFlockCard";
import { FlockSearch } from "./FlockSearch";
import { FlockListState } from "./FlockListStage";
import { FlockMainCards } from "./FlockMainCards";
import { useDebounce } from "@/hooks/useDebounce";
import { filterToPhase } from "../../../utils/filterToPhase";
import { FlockPagination } from "./FlockPagination";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useState } from "react";
import { ItemsFilter } from "@/features/flock/components/cards-filter/ItemsFilter";

export function FlockContent() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

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

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const cows = data?.pages.flatMap((page) => page.data) ?? [];
  const cards = cows.map(cowToFlockCard);

  const totalCount = data?.pages[0]?.meta.total_count ?? 0;

  return (
    <main className="flex flex-col gap-6 p-4 sm:p-6 w-full">
      <FlockHeader
        totalCount={totalCount}
        openModal={() => setOpenModal(true)}
      />
      <section className="flex flex-col gap-6 md:gap-7">
        <FlockSearch
          search={search}
          onSearch={(e) => setSearch(e.target.value)}
        />
        <ItemsFilter value={filter} onChange={setFilter} />
        <FlockListState
          isLoading={isLoading}
          isError={isError}
          isEmpty={cards.length === 0}
        />
        {!isLoading && !isError && cards.length > 0 && (
          <FlockMainCards cards={cards} />
        )}

        <FlockPagination
          loadMoreRef={loadMoreRef}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          hasItems={cards.length > 0}
        />
      </section>
      <ModalForm open={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
}
