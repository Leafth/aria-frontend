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
import { Funnel, X } from "lucide-react";

import {
  ModalFilter,
  type ModalFilterValues,
} from "../../../components/modals/ModalFilter";

import {
  FlockSort,
  type FlockSortBy,
  type FlockSortDir,
} from "../../../components/FlockSort";

const EMPTY_FILTERS: ModalFilterValues = {
  birth_from: undefined,
  birth_to: undefined,
  weight_from: undefined,
  weight_to: undefined,
  reproductive_status: undefined,
};

export function FlockContent() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [sortBy, setSortBy] = useState<FlockSortBy | undefined>();
  const [sortDir, setSortDir] = useState<FlockSortDir>("asc");

  const [appliedFilters, setAppliedFilters] =
    useState<ModalFilterValues>(EMPTY_FILTERS);

  const [draftFilters, setDraftFilters] =
    useState<ModalFilterValues>(EMPTY_FILTERS);

  const debouncedSearch = useDebounce(search, 600);

  const selectedPhase = filterToPhase(filter);
  const activeFilter = filter === "Inativa" ? false : true;

  const hasAppliedFilters = Boolean(
    appliedFilters.birth_from ||
    appliedFilters.birth_to ||
    appliedFilters.weight_from ||
    appliedFilters.weight_to ||
    appliedFilters.reproductive_status,
  );

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

    birth_from: appliedFilters.birth_from,
    birth_to: appliedFilters.birth_to,

    weight_from: appliedFilters.weight_from
      ? Number(appliedFilters.weight_from)
      : undefined,

    weight_to: appliedFilters.weight_to
      ? Number(appliedFilters.weight_to)
      : undefined,

    reproductive_status: appliedFilters.reproductive_status,

    sort_by: sortBy,
    sort_dir: sortBy ? sortDir : undefined,

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

  function openFilters() {
    setDraftFilters(appliedFilters);
    setOpenFilterModal(true);
  }

  function applyFilters() {
    setAppliedFilters(draftFilters);
    setOpenFilterModal(false);
  }

  function clearAppliedFilters() {
    setAppliedFilters(EMPTY_FILTERS);
    setDraftFilters(EMPTY_FILTERS);
  }

  return (
    <main className="flex flex-col gap-6 p-4 sm:p-6 w-full">
      <FlockHeader
        totalCount={totalCount}
        openModal={() => setOpenModal(true)}
      />

      <section className="flex flex-col gap-6 md:gap-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
          <div className="flex flex-1 items-center gap-5">
            <div className="flex-1">
              <FlockSearch
                search={search}
                onSearch={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openFilters}
                className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border transition hover:bg-gray-100 ${
                  hasAppliedFilters
                    ? "border-primary-600 bg-primary-50 text-primary-700"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
                aria-label="Abrir filtros"
              >
                <Funnel className="h-5 w-5" />
              </button>

              {hasAppliedFilters && (
                <button
                  type="button"
                  onClick={clearAppliedFilters}
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100"
                  aria-label="Limpar filtros aplicados"
                  title="Limpar filtros"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <FlockSort
            sortBy={sortBy}
            sortDir={sortDir}
            onSortByChange={setSortBy}
            onSortDirChange={setSortDir}
          />
        </div>

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

      <ModalFilter
        open={openFilterModal}
        onClose={() => setOpenFilterModal(false)}
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={applyFilters}
      />
    </main>
  );
}
