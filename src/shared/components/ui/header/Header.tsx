import { cn } from "@/lib/utils";
import type { HeaderProps } from "./Header.types";

export function Header({
  title,
  description,
  active,
  breed,
  page,
  className,
}: HeaderProps) {
  const isIndividual = page === "individual";
  const isActive = active === "Ativa";

  return (
    <header className={cn("flex flex-col gap-1", className)}>
      <h1 className="flex items-center gap-4 text-xl font-semibold text-text-primary lg:text-2xl">
        {title}

        {isIndividual && active && (
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex items-center rounded-md px-4 h-7",
                isActive ? "bg-green-400" : "bg-gray-400",
              )}
            >
              <p
                className={cn(
                  "text-xs",
                  isActive ? "text-green-950" : "text-gray-700",
                )}
              >
                {active}
              </p>
            </div>

            {breed && (
              <div
                className={cn(
                  "flex items-center rounded-md px-4 h-7",
                  isActive ? "bg-orange-300" : "bg-gray-300",
                )}
              >
                <p
                  className={cn(
                    "text-xs",
                    isActive ? "text-orange-600" : "text-gray-600",
                  )}
                >
                  {breed}
                </p>
              </div>
            )}
          </div>
        )}
      </h1>

      {description && (
        <p className="text-sm text-text-secondary">{description}</p>
      )}
    </header>
  );
}
