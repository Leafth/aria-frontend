import type { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="flex flex-col bg-white px-8 py-5 w-full rounded-lg">
      <header className="mb-5">
        <h1 className="font-semibold text-lg">{title}</h1>
      </header>
      {children}
    </div>
  );
}
