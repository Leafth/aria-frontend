import { AlertTriangle } from "lucide-react";
import { AlertInfo } from "../../../components/alert-info/AlertInfo";
import type { CowDetails } from "../../../types/cow.types";
import { getInactivationReasonLabel } from "@/utils/getInactivationReasonLabel";

interface IndividualRecordAlertProps {
  cow: CowDetails;
}

export function IndividualRecordAlert({ cow }: IndividualRecordAlertProps) {
  if (cow.active) {
    return null;
  }

  const inactivatedAt = cow.inactive_status?.inactivated_at;
  const reason = cow.inactive_status?.inactivated_reason;

  return (
    <AlertInfo level="warning">
      <>
        <AlertTriangle />
        <div>
          <p>
            Matriz inativo
            {inactivatedAt && ` desde ${inactivatedAt}`}. Motivo:{" "}
            {getInactivationReasonLabel(reason)}
          </p>

          <p>
            Esta ficha está em modo somente leitura. O histórico completo está
            preservado para consulta.
          </p>
        </div>
      </>
    </AlertInfo>
  );
}
