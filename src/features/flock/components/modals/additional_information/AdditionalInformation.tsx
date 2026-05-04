import { BirthRecord } from "./BirthRecord";
import { ConfirmPregnancy } from "./ConfirmPregnancy";
import { RegisterCio } from "./RegisterCio";
import { RegisterCoverage } from "./RegisterCoverage";

export function AdditionalInformation({ stage }: { stage?: string }) {
  switch (stage) {
    case "cio_registrado":
      return <RegisterCio />;

    case "prenhez":
      return <ConfirmPregnancy />;

    case "parto_registrado":
      return <BirthRecord />;

    case "cobertura_registrada":
      return <RegisterCoverage />;

    case "confirmar_cobertura":
      return <RegisterCoverage />;

    default:
      return null;
  }
}
