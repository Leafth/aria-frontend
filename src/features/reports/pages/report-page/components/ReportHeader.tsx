import { Button, Header } from "@/shared";
import { Download } from "lucide-react";

interface ReportHeaderProps {
  onDownloadReport: () => void;
  isDownloadingReport: boolean;
}

export function ReportHeader({
  onDownloadReport,
  isDownloadingReport,
}: ReportHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <Header
        title="Dashboard"
        description="Indicadores de desempenho reprodutivo do rebanho"
      />
      <Button
        type="button"
        variant="primary"
        size="md"
        icon={<Download size={20}/>}
        loading={isDownloadingReport}
        onClick={onDownloadReport}
      >
        {isDownloadingReport ? "Gerando relatório..." : "Exportar PDF"}
      </Button>
    </header>
  );
}
