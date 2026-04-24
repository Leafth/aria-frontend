// components/columns/company-columns.ts
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/shared/components/ui/table/DataTableColumnHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, EllipsisIcon, Trash2Icon } from "lucide-react";
import type { CompanyDTO } from "../../types/reproductive-support.types";

export function getCompanyColumns(
  onDeleteClick: (company: CompanyDTO) => void,
  onEditClick: (company: CompanyDTO) => void,
): ColumnDef<CompanyDTO>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nome" />
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descrição" />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const company = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => onEditClick(company)}
                className="cursor-pointer"
              >
                <Edit2Icon className="size-4" /> Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() => onDeleteClick(company)}
                className="cursor-pointer"
              >
                <Trash2Icon className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
