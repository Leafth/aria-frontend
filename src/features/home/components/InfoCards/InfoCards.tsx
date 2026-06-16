interface InfoCardItem {
  id: string;
  value: number;
  title: string;
  description?: string;
}

interface InfoCardsProps {
  data: InfoCardItem[];
}

export function InfoCards({ data }: InfoCardsProps) {
  return (
    <section className="grid w-full grid-cols-1 overflow-hidden rounded-lg bg-white shadow-md shadow-gray-200/70 sm:grid-cols-2 lg:grid-cols-5">
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`flex min-h-24 flex-col items-center justify-center px-6 py-5 text-center ${
            index !== data.length - 1 ? "lg:border-r lg:border-gray-200" : ""
          }`}
        >
          <strong className="text-2xl font-semibold leading-none text-black">
            {item.value}
          </strong>

          <span className="mt-1 text-sm leading-tight text-black">
            {item.title}
          </span>

          {item.description && (
            <span className="text-xs leading-tight text-black">
              {item.description}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}
