import { PeriodFilter } from "@/features/reports/components";
import type { ReportPeriod } from "@/features/reports/components/period-filter/types";
import { Header } from "@/shared";

interface ReportHeaderProps {
  period: ReportPeriod;
  onPeriodChange: (period: ReportPeriod) => void;
}

export function ReportHeader({ period, onPeriodChange }: ReportHeaderProps) {
  return (
    <header>
      <Header
        title="Dashboard"
        description="Indicadores de desempenho reprodutivo do rebanho"
      />

      <div className="mt-4">
        <PeriodFilter value={period} onChange={onPeriodChange} />
      </div>
    </header>
  );
}
