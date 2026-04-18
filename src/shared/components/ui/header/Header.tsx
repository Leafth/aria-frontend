import type { HeaderProps } from "./Header.types";

export function Header({title, description}: HeaderProps) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold text-text-primary lg:text-2xl">
        {title}
      </h1>

      <p className="text-sm text-text-secondary">
        {description}
      </p>
    </header>
  );
}
