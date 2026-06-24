
import { ReportsIndicatorsTable } from "@/features/reports/components";
import { ReportHeader } from "./ReportHeader";
import { reportsTableMock } from "@/features/reports/mock/ReportsTableMock";

export function ReportContent() {
  return (
    <main className="flex flex-col gap-6 p-4 w-full">
      <ReportHeader />
      <ReportsIndicatorsTable data={reportsTableMock} />
    </main>
  );
}
