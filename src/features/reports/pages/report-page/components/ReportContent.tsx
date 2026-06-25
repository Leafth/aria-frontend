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

  return (
    <main className="flex w-full flex-col gap-6 p-4">
      <ReportHeader period={period} onPeriodChange={setPeriod} />

      <ReportContentState isLoading={isLoading} isError={isError}>
        <ReportsIndicatorsTable data={indicatorsData?.table ?? []} />
      </ReportContentState>

      <section className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
        <ChartPieInteractive
          title="Taxa de Diagnóstico"
          description="Últimos 30 dias"
          defaultValue="diagnosis"
          options={[
            {
              value: "diagnosis",
              label: "Diagnóstico",
              confirmedLabel: "Positivos",
              deniedLabel: "Negativos",
              confirmedValue: 20,
              deniedValue: 5,
            },
          ]}
        />
        <ChartPieInteractive
          title="Taxa de Diagnóstico"
          description="Últimos 30 dias"
          defaultValue="diagnosis"
          options={[
            {
              value: "diagnosis",
              label: "Diagnóstico",
              confirmedLabel: "Positivos",
              deniedLabel: "Negativos",
              confirmedValue: 20,
              deniedValue: 5,
            },
          ]}
        />
      </section>

      <ReportContentState isLoading={isLoadingFunnel} isError={isFunnelError}>
        <ChartBarMixed data={funnelData ?? []} />
      </ReportContentState>
      
      <ChartLineMultiple />
    </main>
  );
}
