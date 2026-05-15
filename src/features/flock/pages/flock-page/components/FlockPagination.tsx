interface FlockPaginationProps {
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  hasItems: boolean;
}

export function FlockPagination({
  loadMoreRef,
  isFetchingNextPage,
  hasNextPage,
  hasItems,
}: FlockPaginationProps) {
  return (
    <div ref={loadMoreRef} className="min-h-10 flex justify-center">
      {isFetchingNextPage && (
        <p className="text-sm text-gray-500">Carregando mais animais...</p>
      )}

      {!hasNextPage && hasItems && (
        <p className="text-sm text-gray-400 text-center">
          Todos os animais foram carregados.
        </p>
      )}
    </div>
  );
}
