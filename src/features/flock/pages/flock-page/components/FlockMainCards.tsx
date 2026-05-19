import { FlockCard } from "../../../components/flock-card/FlockCard";
import type { cowToFlockCard } from "../../../utils/cowToFlockCard";

type FlockCardData = ReturnType<typeof cowToFlockCard>;

interface FlockMainCardsProps {
  cards: FlockCardData[];
}

export function FlockMainCards({ cards }: FlockMainCardsProps) {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {cards.map((flock) => (
        <FlockCard
          key={flock.id}
          id={flock.id}
          name={flock.name}
          code={flock.code}
          breed={flock.breed}
          phase={flock.phase}
          age={flock.age}
          weight={flock.weight}
          colorCard={flock.colorCard}
          active={flock.active}
          statusMessage={flock.statusMessage}
          statusDate={flock.statusDate}
          alert={flock.alert}
          inactiveReason={flock.inactiveReason}
        />
      ))}
    </div>
  );
}
