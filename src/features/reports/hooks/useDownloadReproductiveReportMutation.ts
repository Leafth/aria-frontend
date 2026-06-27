import { useMutation } from "@tanstack/react-query";

import type { ReportPeriod } from "../components/period-filter/types";
import { reportsService } from "../services/reports.service";

function downloadBlob(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}

export function useDownloadReproductiveReportMutation(period: ReportPeriod) {
  return useMutation({
    mutationFn: () => reportsService.getReproductiveReport({ period }),
    onSuccess: (blob) => {
      downloadBlob(blob, "relatorio-reprodutivo.pdf");
    },
  });
}
