import { Button, Header } from "@/shared";
import { EditWeightModal } from "../../components/modals/individual-modal/EditWeightModal";
import { SquarePen, Pen, Ban } from "lucide-react";
import { AnimalStatusCard } from "../../components/individual-record/AnimalStatusCard";
import { IndividualForm } from "../../components/forms/individual/IndividualForm";
import { RecentHistoryCard } from "../../components/individual-record/RecentHistoryCard";
import { useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCowById } from "../../hooks/useCowById";
import { useState } from "react";
import { EditCowModal } from "../../components/modals/individual-modal/EditCowModal";
import { InactiveCowModal } from "../../components/modals/individual-modal/InactiveCow";
import { useInactivateCow } from "../../hooks/useInactivateCow";
import { useChangeCowPhase } from "../../hooks/useChangeCowPhase";
import { getPhaseLabel } from "../../utils/getPhaseLabel";
import { getCowStatus } from "../../utils/cowStatus.utils";
import { formatDate } from "@/utils/formatDate";

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

      <header className="flex justify-between items-center">
        <Header
          title={cow.name}
          description={`Brinco: ${cow.ear_tag} Nasc: ${formatDate(
            cow.birth_date,
          )}`}
          active={getCowStatus(cow.active)}
          breed={cow.breed}
          page="individual"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <SquarePen size={20} />
              Ações
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
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
      </header>

      <section>
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
        />

        <div className="flex justify-between mt-5">
          <IndividualForm />

          <RecentHistoryCard
            items={[
              {
                title: "Confirmação de prenhez",
                description: "Diagnóstico positivo por ultrassom",
                date: "01/04/2026",
                color: "#22c55e",
              },
              {
                title: "Inseminação Artificial",
                description: "Sêmen: Bull Power X1",
                date: "12/08/2025",
                color: "#2563eb",
              },
              {
                title: "Cio Detectado",
                description: "Diagnóstico positivo por ultrassom",
                date: "10/04/2025",
                color: "#f59e0b",
              },
              {
                title: "Pesagem Registrada",
                description: "+120kg",
                date: "10/04/2025",
                color: "#84cc16",
              },
            ]}
          />
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
