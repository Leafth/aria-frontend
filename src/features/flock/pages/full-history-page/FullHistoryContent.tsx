import { useState } from "react";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import type { CowDetails } from "../../types/cow.types";
import { FullHistoryMainSection } from "./components/FullHistoryMainSection";
import { cowHistoryToHistoryItem } from "../../sections/cow-history-item";
import { Header } from "@/shared";
import { formatDate } from "@/utils/formatDate";
import { getCowStatus } from "../../utils/cowStatus.utils";
import { useInfiniteCowHistory } from "../../hooks/useInfiniteCowHistory";
import type { HistoryFiltersValue } from "../../components/individual-record/recent-history/HistoryFilter.mock";
import { buildCowHistoryFilters } from "../../sections/build-cow-history-filters";

interface FullHistoryContentProps {
  cow: CowDetails;
}

export function FullHistoryContent({ cow }: FullHistoryContentProps) {
  const navigate = useNavigate();

  const [filter, setFilter] = useState<HistoryFiltersValue>({
    main: "all",
    startDate: "",
    endDate: "",
    reproductiveEvents: [],
  });

  const historyFilters = buildCowHistoryFilters(filter);

  const {
    data: historyData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCowHistory(cow.id, {
    per_page: 10,
    ...historyFilters,
  });

  const historyItems =
    historyData?.pages.flatMap((page) =>
      page.data.map(cowHistoryToHistoryItem),
    ) ?? [];

  return (
    <main className="flex flex-col gap-6 p-4 w-full">
      <Breadcrumb
        items={[
          {
            label: "Rebanho",
            onClick: () => navigate("/flock"),
          },
          {
            label: cow.name,
            onClick: () => navigate(`/flock/individual/${cow.id}`),
          },
          {
            label: "Histórico",
          },
        ]}
      />

      <Header
        title={cow.name}
        description={`Brinco: ${cow.ear_tag} Nasc: ${formatDate(
          cow.birth_date,
        )}`}
        active={getCowStatus(cow.active)}
        breed={cow.breed}
        days_since_last_calving={cow.insights.days_since_last_calving}
        page="individual"
      />

      <FullHistoryMainSection
        filter={filter}
        onFilterChange={setFilter}
        items={historyItems}
        isLoading={isLoading}
        isError={isError}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </main>
  );
}
