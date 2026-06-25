import type { ReportFunnelApi } from "../types/reports-api.types";
import type { FunnelItem } from "../types/reports-view.types";

type FunnelMetricKey =
  | "heat_detection"
  | "insemination"
  | "pregnancy_check"
  | "pregnancy_check_positive"
  | "calving"
  | "pregnancy_interruption";

interface FunnelMeta {
  key: FunnelMetricKey;
  label: string;
  color: string;
}

const FUNNEL_META: FunnelMeta[] = [
  {
    key: "heat_detection",
    label: "Cios",
    color: "#E2BE83",
  },
  {
    key: "insemination",
    label: "Coberturas",
    color: "#248F80",
  },
  {
    key: "pregnancy_check",
    label: "Diagnósticos",
    color: "#70BF72",
  },
  {
    key: "pregnancy_check_positive",
    label: "Confirmações",
    color: "#247D0D",
  },
  {
    key: "calving",
    label: "Partos",
    color: "#D19BC8",
  },
  {
    key: "pregnancy_interruption",
    label: "Interrupções",
    color: "#E7353D",
  },
];

export function mapReportFunnel(data: ReportFunnelApi): FunnelItem[] {
  const values = FUNNEL_META.map((item) => data[item.key] ?? 0);

  const biggestValue = Math.max(...values, 1);

  return FUNNEL_META.map((item) => {
    const value = data[item.key] ?? 0;
    const width = (value / biggestValue) * 100;

    return {
      label: item.label,
      value,
      barWidth: `${width}%`,
      color: item.color,
    };
  });
}
