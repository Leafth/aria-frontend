import { ArrowDownUp, ArrowUpDown } from "lucide-react";

export type FlockSortBy = "name" | "weight" | "birth_date";
export type FlockSortDir = "asc" | "desc";

interface FlockSortProps {
  sortBy?: FlockSortBy;
  sortDir: FlockSortDir;
  onSortByChange: (value?: FlockSortBy) => void;
  onSortDirChange: (value: FlockSortDir) => void;
}

export function FlockSort({
  sortBy,
  sortDir,
  onSortByChange,
  onSortDirChange,
}: FlockSortProps) {
  function toggleSortDir() {
    onSortDirChange(sortDir === "asc" ? "desc" : "asc");
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="text-xs text-gray-800 font-semibold">Ordenar por:</span>

      <select
        value={sortBy ?? ""}
        onChange={(event) => {
          const value = event.target.value;

          onSortByChange(value ? (value as FlockSortBy) : undefined);
        }}
        className="h-10 w-36 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-primary-600 focus:ring-1 focus:ring-primary-200 cursor-pointer"
      >
        <option value="">Selecione</option>
        <option value="name">Nome</option>
        <option value="weight">Peso</option>
        <option value="birth_date">Data Nascimento</option>
      </select>

      <button
        type="button"
        onClick={toggleSortDir}
        className="flex h-10 w-10 items-center justify-center rounded-md text-gray-800 transition hover:bg-gray-100"
        title={sortDir === "asc" ? "Ordem crescente" : "Ordem decrescente"}
      >
        {sortDir === "asc" ? (
          <ArrowUpDown className="h-5 w-5 cursor-pointer" />
        ) : (
          <ArrowDownUp className="h-5 w-5 cursor-pointer" />
        )}
      </button>
    </div>
  );
}
