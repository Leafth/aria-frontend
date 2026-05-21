interface FlockListStateProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

export function FlockListState({
  isLoading,
  isError,
  isEmpty,
}: FlockListStateProps) {
  if (isLoading) {
    return <p className="text-sm text-gray-500">Carregando animais...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-500">Erro ao carregar os animais.</p>;
  }

  if (isEmpty) {
    return <p className="text-sm text-gray-500">Nenhuma matriz encontrado.</p>;
  }

  return null;
}
