import { AlertTriangle } from "lucide-react";
import { AlertInfo } from "../../../components/alert-info/AlertInfo";
import type { CowDetails } from "../../../types/cow.types";

interface IndividualRecordAlertProps {
  cow: CowDetails;
}

export function IndividualRecordAlert({ cow }: IndividualRecordAlertProps) {
  return (
    <>
      {!cow.active && (
        <AlertInfo>
          <>
            <AlertTriangle />
            <div>
              <p>Animal inativo desde 03/03/2025. Motivo: Venda</p>
              <p>
                Esta ficha está em modo somente leitura. O histórico completo
                está preservado para consulta
              </p>
            </div>
          </>
        </AlertInfo>
      )}
    </>
  );
}
