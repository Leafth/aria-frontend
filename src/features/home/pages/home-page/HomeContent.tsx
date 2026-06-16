import { HomeHeader } from "./HomeHeader";
import { HomeMainSection } from "./HomeMainSection";

export function HomeContent() {
  return (
    <main className="flex flex-col gap-6 p-4 w-full">
      <HomeHeader />
      <HomeMainSection />
    </main>
  );
}
