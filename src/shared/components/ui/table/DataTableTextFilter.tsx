import { Input } from "@/components/ui/input";
import { useDataTable } from "./DataTableContext";
import { Search } from "lucide-react";

interface IDataTableTextFilterProps {
  column?: string;
  placeholder?: string;
}

export function DataTableTextFilter({
  placeholder,
  column,
}: IDataTableTextFilterProps) {
  const { table } = useDataTable();

  if (column) {
    const tableColumn = table.getColumn(column);
    const value = tableColumn?.getFilterValue() as string | undefined;

    return (
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

        <Input
          placeholder={placeholder}
          value={value ?? ""}
          className="pl-10"
          onChange={(event) => tableColumn?.setFilterValue(event.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

      <Input
        placeholder={placeholder}
        className="pl-10"
        onChange={(event) =>
          table?.setGlobalFilter(event.target.value)
        }
      />
    </div>
  );
}
