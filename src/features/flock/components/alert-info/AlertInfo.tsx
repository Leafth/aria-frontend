import type { ReactNode } from "react";

interface AlertInfoProps{
    children: ReactNode;
}

export function AlertInfo({children}: AlertInfoProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-orange-100 text-orange-700 p-4 text-sm">
        {children}
    </div>
  );
}
