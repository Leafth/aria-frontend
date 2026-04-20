import { type Invoice } from '@/shared/entities/Invoice';
import { useState } from 'react';
import { DataTable } from '../table';
import { DataTableColumnsVisibilityDropdown } from '../table/DataTableColumnsVisibilityDropdown';
import { DataTableContent } from '../table/DataTableContent';
import { DataTableFacetedFilter } from '../table/DataTableFacetedFilter';
import { DataTablePagination } from '../table/DataTablePagination';
import { DataTableTextFilter } from '../table/DataTableTextFilter';
import { columns } from './columns';
import { invoices } from './data';

export function InvoicesTable() {
  const [, setSelectedRows] = useState<Invoice[]>([]);

  const [data] = useState(invoices);

  return (
    <DataTable
      data={data}
      columns={columns}
      onSelectRow={selectedRows => {
        setSelectedRows(selectedRows);
      }}
      pagination={{
        pageIndex: 0,
        pageSize: 6,
      }}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <DataTableTextFilter
          placeholder="Search..."
          column="paymentStatus"
        />
        <DataTableFacetedFilter column="paymentStatus" />
        <DataTableColumnsVisibilityDropdown />
      </div>

      <DataTableContent />

      <div className="flex justify-end items-center mt-4">
        <DataTablePagination />
      </div>
    </DataTable>
  );
}