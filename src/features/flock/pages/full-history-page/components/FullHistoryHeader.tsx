import { Header } from "@/shared";
import { formatDate } from "@/utils/formatDate";
import { getCowStatus } from "../../../utils/cowStatus.utils";
import type { Cow } from "../../../types/cow.types";

interface FullHistoryHeaderProps {
  cow: Cow;
}
export function FullHistoryHeader({ cow }: FullHistoryHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <Header
        title={cow.name}
        description={`Brinco: ${cow.ear_tag} Nasc: ${formatDate(
          cow.birth_date,
        )}`}
        active={getCowStatus(cow.active)}
        breed={cow.breed}
        page="individual"
      />
    </header>
  );
}
