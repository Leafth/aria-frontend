import type { DonutChartOption } from "../components/charts/reports-donut/types";
import type { ReportIndicatorApi } from "../types/reports-api.types";

const INDICATOR_META = {
  insemination_success: {
    optionLabel: "Inseminações",
    successLabel: "Confirmadas",
    failureLabel: "Negadas",
  },
  heat_coverage: {
    optionLabel: "Cobertura",
    successLabel: "Com Cobertura",
    failureLabel: "Sem Cobertura",
  },
  pregnancy_success: {
    optionLabel: "Prenhez",
    successLabel: "Confirmadas",
    failureLabel: "Negadas",
  },
} as const;

function getIndicatorMeta(indicator: string) {
  return (
    INDICATOR_META[indicator as keyof typeof INDICATOR_META] ?? {
      optionLabel: indicator,
      successLabel: "Sucessos",
      failureLabel: "Falhas",
    }
  );
}

function formatRate(value: number) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}%`;
}

export function mapIndicatorsToSuccessRateChartOptions(
  data: ReportIndicatorApi[],
): DonutChartOption[] {
  return data.map((item) => {
    const meta = getIndicatorMeta(item.indicator);

    return {
      value: item.indicator,
      label: meta.optionLabel,
      centerValue: formatRate(item.rate),
      centerLabel: "taxa",
      legendTitle: "Taxa de Sucesso",
      legendSubtitle: `Total - ${item.total}`,
      slices: [
        {
          id: "successes",
          label: meta.successLabel,
          value: item.successes,
          color: "#299D8F",
        },
        {
          id: "failures",
          label: meta.failureLabel,
          value: item.failures,
          color: "#EA694A",
        },
      ],
      legendItems: [
        {
          id: "successes",
          label: meta.successLabel,
          value: item.successes,
          color: "#299D8F",
        },
        {
          id: "failures",
          label: meta.failureLabel,
          value: item.failures,
          color: "#EA694A",
        },
      ],
    };
  });
}
