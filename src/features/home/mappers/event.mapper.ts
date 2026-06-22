import type { EventsResponseApi } from "../types/home-service.types";
import type { LastEventItem } from "../types/home-view.types";

const EVENT_TITLE_BY_TYPE: Record<string, string> = {
  pregnancy_check: "Diagnóstico de Prenhez",
  insemination: "Cobertura Realizada",
  heat_detection: "Cio Registrado",
  weighing: "Pesagem",
  calving: "Parto Registrado",
};

export function mapEventsToView(response: EventsResponseApi): LastEventItem[] {
  return response.data.map((event) => {
    const eventTitle = EVENT_TITLE_BY_TYPE[event.event_type] ?? event.title;

    return {
      id: event.id,
      event: eventTitle,
      cow: `${event.cow_name} (BRC-${event.ear_tag})`,
    };
  });
}
