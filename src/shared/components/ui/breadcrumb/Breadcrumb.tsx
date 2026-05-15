import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isClickable = Boolean(item.onClick) && !isLast;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1"
            >
              {isClickable ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="cursor-pointer hover:text-black transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <span className={isLast ? "text-gray-800 font-semibold" : ""}>
                  {item.label}
                </span>
              )}

              {!isLast && <ChevronRight size={14} className="text-gray-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
