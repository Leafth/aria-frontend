import {
  LastEventsCard,
  PhaseDistruibutionCard,
  AlertsCard,
  InfoCards,
} from "../../components";
import { useHome } from "../../hooks";

export function HomeMainSection() {
  const {
    infoCards,
    alerts,
    phaseDistribution,
    lastEvents,
    isLoading,
    isError,
  } = useHome();

  if (isLoading) {
    return (
      <section className="flex w-full flex-col gap-5">
        <p className="text-sm text-gray-500">Carregando dados da página...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex w-full flex-col gap-5">
        <p className="text-sm text-red-500">
          Não foi possível carregar os dados da página.
        </p>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col gap-5">
      <InfoCards data={infoCards} />
      <AlertsCard data={alerts} />

      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
        <PhaseDistruibutionCard data={phaseDistribution} />
        <LastEventsCard data={lastEvents} />
      </div>
    </section>
  );
}
