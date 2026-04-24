import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/shared/components/ui/table/DataTableColumnHeader';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit2Icon, EllipsisIcon, Trash2Icon } from 'lucide-react';
import { type BullDTO } from '../../types/reproductive-support.types';

const originLabel: Record<BullDTO['origin'], string> = {
  local: 'Local',
  company: 'Empresa',
};

export const bullColumns: ColumnDef<BullDTO>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
    meta: { nameInFilters: 'Nome' },
    filterFn: 'equalsString',
  },
  {
    accessorKey: 'breed',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Raça" />,
    meta: { nameInFilters: 'Raça' },
  },
  {
    accessorKey: 'origin',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Origem" />,
    meta: { nameInFilters: 'Origem' },
    cell: ({ row }) => originLabel[row.original.origin],
  },
  {
    accessorKey: 'ear_tag',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Brinco" />,
    meta: { nameInFilters: 'Brinco' },
    cell: ({ row }) => row.original.ear_tag ?? '—',
  },
  {
    id: 'company',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Empresa" />,
    meta: { nameInFilters: 'Empresa' },
    cell: ({ row }) => row.original.company?.name ?? '—',
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
      const bull = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => alert(`Edit ${bull.name}`)}>
                <Edit2Icon className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => alert(`Delete ${bull.name}`)}>
                <Trash2Icon className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];