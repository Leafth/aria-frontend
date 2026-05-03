import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface ToggleFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export function ToggleField({
  label,
  value,
  onChange,
  options,
}: ToggleFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-xs text-text-primary">{label}</span>}

      <div className="flex bg-gray-300 rounded-full p-1 w-fit">
        {options.map((opt) => {
          const active = value === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "px-4 py-1.5 text-sm rounded-full transition-all cursor-pointer",
                active ? "bg-white text-black shadow" : "text-gray-700",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
