import { Button, Header } from "@/shared";
import { CirclePlus } from "lucide-react";

interface FlockHeaderProps {
  totalCount: number;
  openModal: () => void;
}

export function FlockHeader({ totalCount, openModal }: FlockHeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Header
        title="Rebanho"
        description={`${totalCount} animais cadastrados`}
      />

      <Button onClick={openModal} className="w-full md:w-auto">
        <CirclePlus size={20} />
        Cadastrar Animal
      </Button>
    </header>
  );
}
