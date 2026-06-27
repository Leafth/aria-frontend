import type { ReactNode } from "react";

interface ReportContentStateProps {
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
}

export function ReportContentState({
  isLoading,
  isError,
  children,
}: ReportContentStateProps) {
  if (isLoading) {
    return (
      <main className="flex w-full flex-col gap-6 p-4">
        <div className="rounded-lg bg-white p-6">
          <p className="text-sm text-gray-500">Carregando indicadores...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex w-full flex-col gap-6 p-4">
        <div className="rounded-lg bg-white p-6">
          <p className="text-sm text-red-500">
            Não foi possível carregar os indicadores.
          </p>
        </div>
      </main>
    );
  }

  return children;
}
