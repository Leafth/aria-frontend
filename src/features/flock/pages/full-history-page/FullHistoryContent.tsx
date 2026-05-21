import { Breadcrumb } from "@/shared/components/ui/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import type { CowDetails } from "../../types/cow.types";
import { FullHistoryMainSection } from "./components/FullHistoryMainSection";
import { useCowHistory } from "../../hooks/useCowHistory";
import { cowHistoryToHistoryItem } from "../../sections/cow-history-item";

interface FullHistoryContentProps {
  cow: CowDetails;
}

export function FullHistoryContent({ cow }: FullHistoryContentProps) {
  const navigate = useNavigate();

  const {
    data: historyData,
    isLoading,
    isError,
  } = useCowHistory(cow.id, {
    per_page: 50,
  });

  const historyItems = historyData?.data.map(cowHistoryToHistoryItem) ?? [];

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
      <FullHistoryMainSection
        items={historyItems}
        isLoading={isLoading}
        isError={isError}
      />
    </main>
  );
}
