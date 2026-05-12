import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recentHistoryMock } from "../../components/individual-record/recent-history/recent-history.mock";
import { RecentHistoryCard } from "../../components/individual-record/recent-history/RecentHistoryCard";
import { useCowById } from "../../hooks/useCowById";
import { Button, Header } from "@/shared";
import { formatDate } from "@/utils/formatDate";
import { getCowStatus } from "../../utils/cowStatus.utils";
import type { HistoryFilterValue } from "../../components/individual-record/recent-history/HistoryFilter.mock";
import { HistoryFilter } from "../../components/individual-record/recent-history/HistoryFilter";

export default function FullHistoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: cow, isLoading, isError } = useCowById(id);

  const [historyFilter, setHistoryFilter] =
    useState<HistoryFilterValue>("Todas");

  const filteredHistory =
    historyFilter === "Todas"
      ? recentHistoryMock
      : recentHistoryMock.filter((item) => item.type === historyFilter);

  if (isLoading) {
    return (
      <main className="flex flex-col gap-6 p-4 w-full">
        <p className="text-sm text-gray-500">Carregando dados da vaca...</p>
      </main>
    );
  }

  if (isError || !cow) {
    return (
      <main className="flex flex-col gap-6 p-4 w-full">
        <p className="text-sm text-red-500">
          Erro ao carregar os dados da vaca.
        </p>

        <Button onClick={() => navigate("/flock")}>
          Voltar para o rebanho
        </Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-4 w-full">
      <div>
        <p className="text-gray-500 text-sm">
          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/flock")}
          >
            Rebanho
          </span>{" "}
          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate(`/flock/individual/${cow.id}`)}
          >
            {">"} {cow.name}
          </span>{" "}
          {">"} Histórico
        </p>
      </div>

      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Header
          title={cow.name}
          description={`Brinco: ${cow.ear_tag} Nasc: ${formatDate(
            cow.birth_date,
          )}`}
          active={getCowStatus(cow.active)}
          breed={cow.breed}
          page="individual"
        />
      </header>

      <section className="flex flex-col gap-5">
        <HistoryFilter value={historyFilter} onChange={setHistoryFilter} />

        <div className="flex flex-col gap-5 xl:flex-row">
          <div className="w-full xl:flex-1">
            <RecentHistoryCard
              items={filteredHistory}
              isActive={cow.active}
              showViewAllButton={false}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
