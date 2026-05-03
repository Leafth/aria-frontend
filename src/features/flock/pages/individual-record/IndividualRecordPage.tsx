import { Button, Header } from "@/shared";
import { SquarePen, Pen, Trash2 } from "lucide-react";
import { AnimalStatusCard } from "../../components/individual-record/AnimalStatusCard";
import { IndividualForm } from "../../components/forms/individual/IndividualForm";
import { RecentHistoryCard } from "../../components/individual-record/RecentHistoryCard";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function IndividualRecordPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col gap-6 p-4 w-full">
      <div>
        <p className="text-gray-500 text-sm">
          <span className="cursor-pointer hover:text-black" onClick={() => navigate("/flock")}>
            Rebanho
          </span>{" "}
          {">"} Estrela
        </p>
      </div>
      <header className="flex justify-between items-center">
        <Header
          title="Estrela"
          description="Brinco: #BRC-044 Nasc: 12/03/2026"
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
              onSelect={() => alert("Editar")}
              className="cursor-pointer"
            >
              <Pen size={16} />
              Editar Dados
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => alert("Excluir")}
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
          status="Aguardando Cio"
          nextDate="04/07/2027"
          weight="542 kg"
          lastWeigh="04/07/2027"
          phase="Bezerra"
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
    </main>
  );
}
