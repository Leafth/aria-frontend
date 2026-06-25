import type { ReportIndicatorApi } from "../types/reports-api.types";
import type {
  ReportIndicatorsView,
  ReportIndicatorRow,
  SuccessPieOption,
} from "../types/reports-view.types";

const INDICATOR_META = {
  insemination_success: {
    title: "Sucesso de\nInseminações",
    successLabel: "Confirmadas",
    failureLabel: "Negadas",
    totalLabel: "Exames",
    optionLabel: "Inseminações",
  },
  heat_coverage: {
    title: "Cios com\nCobertura",
    successLabel: "Com Cobertura",
    failureLabel: "Sem Cobertura",
    totalLabel: "Cios",
    optionLabel: "Cobertura",
  },
  pregnancy_success: {
    title: "Sucesso de\nPrenhez",
    successLabel: "Partos",
    failureLabel: "Interrupções",
    totalLabel: "Encerradas",
    optionLabel: "Prenhez",
  },
} as const;

function getIndicatorMeta(indicator: string) {
  return (
    INDICATOR_META[indicator as keyof typeof INDICATOR_META] ?? {
      title: indicator,
      successLabel: "Sucessos",
      failureLabel: "Falhas",
      totalLabel: "Total",
      optionLabel: indicator,
    }
  );
}

export function mapReportIndicatorsToTable(
  data: ReportIndicatorApi[],
): ReportIndicatorRow[] {
  return data.map((item) => {
    const meta = getIndicatorMeta(item.indicator);

    return {
      id: item.indicator,
      indicator: meta.title,
      successes: {
        value: item.successes,
        label: meta.successLabel,
      },
      failures: {
        value: item.failures,
        label: meta.failureLabel,
      },
      total: {
        value: item.total,
        label: meta.totalLabel,
      },
      rate: item.rate,
      variation: item.variation,
    };
  });
}

export function mapReportIndicatorsToPieOptions(
  data: ReportIndicatorApi[],
): SuccessPieOption[] {
  return data.map((item) => {
    const meta = getIndicatorMeta(item.indicator);

    return {
      value: item.indicator,
      label: meta.optionLabel,
      confirmedLabel: meta.successLabel,
      deniedLabel: meta.failureLabel,
      confirmedValue: item.successes,
      deniedValue: item.failures,
    };
  });
}

export function mapReportIndicators(
  data: ReportIndicatorApi[],
): ReportIndicatorsView {
  return {
    table: mapReportIndicatorsToTable(data),
    pieOptions: mapReportIndicatorsToPieOptions(data),
  };
}
