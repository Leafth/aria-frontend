import { formatDate } from "@/utils/formatDate";
import type { CowDetails } from "../../../types/cow.types";
import { getCowStatus } from "../../../utils/cowStatus.utils";
import { Button, Header } from "@/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Pen, SquarePen, Trash2 } from "lucide-react";

interface IndividualRecordHeaderProps {
  cow: CowDetails;
  onEdit: () => void;
  onInactive: () => void;
  onDelete: () => void;
}

export function IndividualRecordHeader({
  cow,
  onEdit,
  onInactive,
  onDelete,
}: IndividualRecordHeaderProps) {
  return (
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-35">
            <SquarePen size={20} />
            Ações
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-full sm:w-auto">
          {cow.active && (
            <>
              <DropdownMenuItem onSelect={onEdit} className="cursor-pointer">
                <Pen size={16} />
                Editar Dados
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={onInactive}
                className="cursor-pointer"
              >
                <Ban size={16} />
                Inativar
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem onSelect={onDelete} className="cursor-pointer">
            <Trash2 size={16} />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
