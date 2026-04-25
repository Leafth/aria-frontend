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
import type { CompanyDTO } from "@/features/reproductive-support/types";

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
      meta: { nameInFilters: 'Nome' },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descrição" />
      ),
      meta: { nameInFilters: 'Descrição' },
    },
    {
      id: "actions",
      size: 80,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      enableHiding: false,
      enableResizing: false,
      enableMultiSort: false,
      enableSorting: false,
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
                <Edit2Icon className="size-4" /> Edite
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
