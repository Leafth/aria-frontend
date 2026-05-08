import type { HeaderProps } from "./Header.types";

export function Header({
  title,
  description,
  active,
  breed,
  page,
}: HeaderProps) {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="flex items-center gap-4 text-xl font-semibold text-text-primary lg:text-2xl">
        {title}
        {page === "individual" && (
          <div className="flex items-center gap-4">
            {active === "Ativa" && (
              <>
                <div className="flex items-center rounded-md px-4 h-7 bg-green-400">
                  <p className="text-green-950 text-xs">{active}</p>
                </div>
                <div className="flex items-center rounded-md px-4 h-7 bg-orange-300">
                  <p className="text-orange-600 text-xs">{breed}</p>
                </div>
              </>
            )}
            {active === "Inativa" && (
              <>
                <div className="flex items-center rounded-md px-4 h-7 bg-gray-400">
                  <p className="text-gray-700 text-xs">{active}</p>
                </div>
                <div className="flex items-center rounded-md px-4 h-7 bg-gray-300">
                  <p className="text-gray-600 text-xs">{breed}</p>
                </div>
              </>
            )}
          </div>
        )}
      </h1>

      <p className="text-sm text-text-secondary">{description}</p>
    </header>
  );
}
