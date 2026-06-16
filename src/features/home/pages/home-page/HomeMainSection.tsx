import { LastEventsCard, PhaseDistruibutionCard } from "../../components";
import { AlertsCard } from "../../components/AlertsCard/AlertsCard";
import { InfoCards } from "../../components/InfoCards";
import { alertsMock, infoCardsMock, lastEventsMock } from "../../mock";

export function HomeMainSection() {
  return (
    <section className="flex w-full flex-col gap-5">
      <InfoCards data={infoCardsMock} />
      <AlertsCard data={alertsMock} />

      <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
        <PhaseDistruibutionCard />
        <LastEventsCard data={lastEventsMock} />
      </div>
    </section>
  );
}
