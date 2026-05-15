import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

interface FlockSearchProps {
  search: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function FlockSearch({ search, onSearch }: FlockSearchProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

      <Input
        placeholder="Buscar por nome ou brinco..."
        value={search}
        onChange={onSearch}
        className="pl-10"
      />
    </div>
  );
}
