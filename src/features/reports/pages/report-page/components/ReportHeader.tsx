import {
  PeriodFilter,
  type PeriodFilterValue,
} from "@/features/reports/components";
import { Header } from "@/shared";
import { useState } from "react";

export function ReportHeader() {
  const [period, setPeriod] = useState<PeriodFilterValue>("7d");

  return (
    <header>
      <Header
        title="Relatórios"
        description="Indicadores de desempenho reprodutivo do rebanho"
      />
      <div className="mt-4">
        <PeriodFilter value={period} onChange={setPeriod} />
      </div>
    </header>
  );
}
