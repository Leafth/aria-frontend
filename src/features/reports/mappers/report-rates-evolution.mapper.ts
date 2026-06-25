import type { ReportRatesEvolutionApi } from "../types/reports-api.types";
import type { RatesEvolutionChartItem } from "../types/reports-view.types";

function formatMonth(month: string) {
  if (!/^\d{4}-\d{2}$/.test(month)) {
    return month;
  }

  const [year, monthNumber] = month.split("-");
  const date = new Date(Number(year), Number(monthNumber) - 1);

  const formattedMonth = date
    .toLocaleDateString("pt-BR", {
      month: "short",
    })
    .replace(".", "");

  return `${formattedMonth}/${year.slice(2)}`;
}

export function mapReportRatesEvolution(
  data: ReportRatesEvolutionApi[],
): RatesEvolutionChartItem[] {
  return data.map((item) => ({
    month: formatMonth(item.month),
    inseminacao: item.insemination_success,
    cobertura: item.heat_coverage,
    prenhez: item.pregnancy_success,
  }));
}
