import { useNavigate, useParams } from "react-router-dom";
import { useCowById } from "../../hooks/useCowById";
import { Button } from "@/shared";
import { FullHistoryContent } from "./FullHistoryContent";

export default function FullHistoryPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: cow, isLoading, isError } = useCowById(id);

  if (isLoading) {
    return (
      <main className="flex flex-col gap-6 p-4 w-full">
        <p className="text-sm text-gray-500">Carregando dados da matriz...</p>
      </main>
    );
  }

  if (isError || !cow) {
    return (
      <main className="flex flex-col gap-6 p-4 w-full">
        <p className="text-sm text-red-500">
          Erro ao carregar os dados da matriz.
        </p>

        <Button onClick={() => navigate("/flock")}>
          Voltar para o rebanho
        </Button>
      </main>
    );
  }

  return <FullHistoryContent cow={cow} />;
}
