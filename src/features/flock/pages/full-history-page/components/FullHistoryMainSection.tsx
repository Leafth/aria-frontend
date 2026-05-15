import { useState } from "react";
import { HistoryFilter } from "../../../components/individual-record/recent-history/HistoryFilter";
import type { HistoryFilterValue } from "../../../components/individual-record/recent-history/HistoryFilter.mock";
import { RecentHistoryCard } from "../../../components/individual-record/recent-history/RecentHistoryCard";
import type { Cow } from "../../../types/cow.types";
import { recentHistoryMock } from "../../../components/individual-record/recent-history/recent-history.mock";

interface FullHistoryMainSectionProps {
  cow: Cow;
}

export function FullHistoryMainSection({ cow }: FullHistoryMainSectionProps) {
  const [historyFilter, setHistoryFilter] =
    useState<HistoryFilterValue>("Todas");

  const filteredHistory =
    historyFilter === "Todas"
      ? recentHistoryMock
      : recentHistoryMock.filter((item) => item.type === historyFilter);

  return (
    <section className="flex flex-col gap-5">
      <HistoryFilter value={historyFilter} onChange={setHistoryFilter} />

      <div className="flex flex-col gap-5 xl:flex-row">
        <div className="w-full xl:flex-1">
          <RecentHistoryCard
            items={filteredHistory}
            isActive={cow.active}
            showViewAllButton={false}
          />
        </div>
      </div>
    </section>
  );
}
