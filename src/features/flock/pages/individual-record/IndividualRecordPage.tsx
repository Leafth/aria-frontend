import { Button, Header } from "@/shared";
import { EditWeightModal } from "../../components/modals/individual-modal/EditWeightModal";
import { SquarePen, Pen, Trash2 } from "lucide-react";
import { AnimalStatusCard } from "../../components/individual-record/AnimalStatusCard";
import { IndividualForm } from "../../components/forms/individual/IndividualForm";
import { RecentHistoryCard } from "../../components/individual-record/RecentHistoryCard";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCow } from "../../hooks/useUpdateCow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCowById } from "../../hooks/useCowById";
import type { CowPhase } from "../../types/cow.types";
import { useState } from "react";
import { EditCowModal } from "../../components/modals/individual-modal/EditCowModal";
import { InactiveCowModal } from "../../components/modals/individual-modal/InactiveCow";
import { useInactivateCow } from "../../hooks/useInactivateCow";
import { useRegisterCowWeight } from "../../hooks/useRegisterCowWeight";
import { useChangeCowPhase } from "../../hooks/useChangeCowPhase";

function getPhaseLabel(phase: CowPhase) {
  const labels: Record<CowPhase, string> = {
    calf: "Bezerra",
    heifer: "Garrota",
    young: "Novilha",
    primiparous: "Primípara",
    multiparous: "Multiparta",
  };

  return labels[phase];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

function getStatus(active: boolean) {
  return active ? "Ativa" : "Inativa";
}

export default function IndividualRecordPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openInactiveModal, setOpenInactiveModal] = useState(false);

  const { data: cow, isLoading, isError } = useCowById(id);
  const [openWeightModal, setOpenWeightModal] = useState(false);

  const { mutateAsync: updateCow } = useUpdateCow();
  const { mutateAsync: inactivateCow, isPending: isInactivating } =
    useInactivateCow();
  const { mutateAsync: registerCowWeight, isPending: isRegisteringWeight } =
    useRegisterCowWeight();
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
          description={`Brinco: #${cow.ear_tag} Nasc: ${formatDate(
            cow.birth_date,
          )}`}
          active={getStatus(cow.active)}
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
              <Trash2 size={16} />
              Inativar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <section>
        <AnimalStatusCard
          status={getStatus(cow.active)}
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
        initialData={{
          name: cow.name,
          code: cow.ear_tag,
          birthDate: cow.birth_date,
          breed: cow.breed,
        }}
        onSubmit={async (data) => {
          await updateCow({
            id: cow.id,
            data: {
              name: data.name,
              ear_tag: data.code,
              birth_date: data.birthDate,
              breed: data.breed,
            },
          });
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
        isLoading={isRegisteringWeight}
        onSubmit={async (data) => {
          await registerCowWeight({
            id: cow.id,
            data: {
              weight: Number(data.weight),
              occurred_at: data.occurred_at,
            },
          });
        }}
      />
    </main>
  );
}
