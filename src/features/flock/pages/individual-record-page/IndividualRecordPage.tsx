import { Button, Header } from "@/shared";
import { EditWeightModal } from "../../components/modals/individual-modal/EditWeightModal";
import { SquarePen, Pen, Ban } from "lucide-react";
import { AnimalStatusCard } from "../../components/individual-record/AnimalStatusCard";
import { IndividualForm } from "../../components/forms/individual/IndividualForm";
import { RecentHistoryCard } from "../../components/individual-record/recent-history/RecentHistoryCard";
import { useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertTriangle } from "lucide-react";

import { useCowById } from "../../hooks/useCowById";
import { useState } from "react";
import { EditCowModal } from "../../components/modals/individual-modal/EditCowModal";
import { InactiveCowModal } from "../../components/modals/individual-modal/InactiveCow";
import { useInactivateCow } from "../../hooks/useInactivateCow";
import { useChangeCowPhase } from "../../hooks/useChangeCowPhase";
import { getPhaseLabel } from "../../utils/getPhaseLabel";
import { getCowStatus } from "../../utils/cowStatus.utils";
import { formatDate } from "@/utils/formatDate";
import { recentHistoryMock } from "../../components/individual-record/recent-history/recent-history.mock";
import { AlertInfo } from "../../components/alert-info/AlertInfo";

export default function IndividualRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openInactiveModal, setOpenInactiveModal] = useState(false);

  const { data: cow, isLoading, isError } = useCowById(id);
  const [openWeightModal, setOpenWeightModal] = useState(false);

  const { mutateAsync: inactivateCow, isPending: isInactivating } =
    useInactivateCow();
  const { mutateAsync: changeCowPhase, isPending: isChangingPhase } =
    useChangeCowPhase();

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
      <div>
        <p className="text-gray-500 text-sm">
          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/flock")}
          >
            Rebanho
          </span>{" "}
          {">"} {cow.name}
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

        {cow.active && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-35">
                <SquarePen size={20} />
                Ações
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-full sm:w-auto">
              <DropdownMenuItem
                onSelect={() => setOpenEditModal(true)}
                className="cursor-pointer"
              >
                <Pen size={16} />
                Editar Dados
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() => setOpenInactiveModal(true)}
                className="cursor-pointer"
              >
                <Ban size={16} />
                Inativar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </header>

      <section className="flex flex-col gap-5">
        <AnimalStatusCard
          nextDate="-"
          weight={`${cow.weight}kg`}
          lastWeigh="-"
          phase={getPhaseLabel(cow.phase)}
          currentPhase={cow.phase}
          onRegisterWeight={() => setOpenWeightModal(true)}
          isChangingPhase={isChangingPhase}
          onChangePhase={async (phase) => {
            await changeCowPhase({
              id: cow.id,
              data: {
                phase,
              },
            });
          }}
          isActive={cow.active}
        />

        <div className="flex flex-col gap-5 xl:flex-row">
          {cow.active && (
            <div className="w-full xl:flex-1">
              <IndividualForm />
            </div>
          )}

          <div className="w-full xl:flex-1">
            <RecentHistoryCard
              items={recentHistoryMock}
              isActive={cow.active}
              onViewAll={() =>
                navigate(`/flock/individual/full-history/${cow.id}`)
              }
              showViewAllButton={true}
            />
          </div>
        </div>
      </section>
      <EditCowModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        cowId={cow.id}
        initialData={{
          name: cow.name,
          code: cow.ear_tag,
          birthDate: cow.birth_date,
          breed: cow.breed,
        }}
      />
      <InactiveCowModal
        open={openInactiveModal}
        onClose={() => setOpenInactiveModal(false)}
        isLoading={isInactivating}
        onConfirm={async (data) => {
          await inactivateCow({
            id: cow.id,
            data,
          });
        }}
      />
      <EditWeightModal
        open={openWeightModal}
        onClose={() => setOpenWeightModal(false)}
        cowId={cow.id}
      />
    </main>
  );
}
