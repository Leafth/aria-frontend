import { Breadcrumb } from "@/shared/components/ui/breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import type { Cow } from "../../types/cow.types";
import { FullHistoryMainSection } from "./components/FullHistoryMainSection";

interface FullHistoryContentProps {
  cow: Cow;
}

export function FullHistoryContent({ cow }: FullHistoryContentProps) {
  const navigate = useNavigate();

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
      <FullHistoryMainSection cow={cow} />
    </main>
  );
}
