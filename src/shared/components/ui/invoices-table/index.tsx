import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { DataTable } from '../table';
import { DataTableColumnsVisibilityDropdown } from '../table/DataTableColumnsVisibilityDropdown';
import { DataTableContent } from '../table/DataTableContent';
import { DataTableFacetedFilter } from '../table/DataTableFacetedFilter';
import { DataTablePagination } from '../table/DataTablePagination';
import { DataTableTextFilter } from '../table/DataTableTextFilter';

interface InvoicesTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  searchColumn?: string;
}

export function InvoicesTable<TData>({
  data,
  columns,
  pageCount,
  pagination,
  onPaginationChange,
  searchColumn
}: InvoicesTableProps<TData>) {

  return (
    <DataTable
      data={data}
      columns={columns}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <DataTableTextFilter
          placeholder="Pesquisar..."
          column={searchColumn}
        />
        <div className='flex justify-center items-center gap-2'>
          <DataTableFacetedFilter column={searchColumn ?? 'name'} />
          <DataTableColumnsVisibilityDropdown />
        </div>
      </div>

      <DataTableContent />

      <div className="flex justify-end items-center mt-4">
        <DataTablePagination />
      </div>
    </DataTable>
  );
}