import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/shared/components/ui/table/DataTableColumnHeader';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit2Icon, EllipsisIcon, Trash2Icon } from 'lucide-react';
import { type CompanyDTO } from '../../types/reproductive-support.types';

export const companyColumns: ColumnDef<CompanyDTO>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    meta: {
      nameInFilters:'Nome',
    },
    filterFn: 'equalsString',
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Descrição" />,
    meta: {
      nameInFilters:'Descrição',
    },
  },
  {
    id: 'actions',
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
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => alert(`Edit ${company.name}`)}>
                <Edit2Icon className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => alert(`Delete ${company.name}`)}>
                <Trash2Icon className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];