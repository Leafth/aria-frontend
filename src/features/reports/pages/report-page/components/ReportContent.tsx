import {
  ChartBarMixed,
  ChartLineMultiple,
  ChartPieInteractive,
  ReportsIndicatorsTable,
} from "@/features/reports/components";
import { ReportHeader } from "./ReportHeader";
import { useReportIndicatorsQuery } from "@/features/reports/hooks/useReportIndicatorsQuery";
import { ReportContentState } from "@/features/reports/reports-content-stage/ReportsContentStage";
import type { ReportPeriod } from "@/features/reports/components/period-filter/types";
import { useState } from "react";
import { useReportFunnelQuery } from "@/features/reports/hooks/useReportFunnelQuery";
import { useReportRatesEvolutionQuery } from "@/features/reports/hooks/useReportRatesEvolutionQuery";
import { useInseminationDistributionQuery } from "@/features/reports/hooks/useInseminationDistributionQuery";

export function ReportContent() {
  const [period, setPeriod] = useState<ReportPeriod>("7d");

  const {
    data: indicatorsData,
    isLoading,
    isError,
  } = useReportIndicatorsQuery(period);

  const {
    data: funnelData,
    isLoading: isLoadingFunnel,
    isError: isFunnelError,
  } = useReportFunnelQuery(period);

  const {
    data: ratesEvolutionData,
    isLoading: isLoadingRatesEvolution,
    isError: isRatesEvolutionError,
  } = useReportRatesEvolutionQuery();

  const {
    data: inseminationOptions,
    isLoading: isLoadingInsemination,
    isError: isInseminationError,
  } = useInseminationDistributionQuery(period);

  return (
    <main className="flex w-full flex-col gap-6 p-4">
      <ReportHeader period={period} onPeriodChange={setPeriod} />

      <ReportContentState isLoading={isLoading} isError={isError}>
        <ReportsIndicatorsTable data={indicatorsData?.table ?? []} />
      </ReportContentState>

      <section className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
        <ReportContentState isLoading={isLoading} isError={isError}>
          <ChartPieInteractive
            title="Taxa de Sucesso"
            description="Indicadores reprodutivos"
            defaultValue="pregnancy_success"
            options={indicatorsData?.successRateOptions ?? []}
          />
        </ReportContentState>
        <ReportContentState
          isLoading={isLoadingInsemination}
          isError={isInseminationError}
        >
          <ChartPieInteractive
            title="Inseminações"
            description="January - June 2024"
            defaultValue="method"
            options={inseminationOptions ?? []}
          />
        </ReportContentState>
      </section>

      <ReportContentState isLoading={isLoadingFunnel} isError={isFunnelError}>
        <ChartBarMixed data={funnelData ?? []} />
      </ReportContentState>

      <ReportContentState
        isLoading={isLoadingRatesEvolution}
        isError={isRatesEvolutionError}
      >
        <ChartLineMultiple data={ratesEvolutionData ?? []} />
      </ReportContentState>
    </main>
  );
}
