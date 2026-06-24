import {
  ReportsIndicatorsTable,
  ChartPieInteractive,
  ChartBarMixed,
  ChartLineMultiple,
} from "@/features/reports/components";

import { ReportHeader } from "./ReportHeader";
import { reportsTableMock } from "@/features/reports/mock/ReportsTableMock";

export function ReportContent() {
  return (
    <main className="flex w-full flex-col gap-6 p-4">
      <ReportHeader />

      <ReportsIndicatorsTable data={reportsTableMock} />

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

      <ChartBarMixed />
      <ChartLineMultiple />
    </main>
  );
}
