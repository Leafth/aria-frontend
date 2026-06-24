import { formatPercentage } from "../../utils/formatPercentage";
import type { ReportsIndicatorsTableProps } from "./types";
import { VariationBadge } from "./VariationBadge";

export function ReportsIndicatorsTable({ data }: ReportsIndicatorsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white px-6 py-6">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-212.5` border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-5 pb-7 text-left text-sm font-medium text-gray-500">
                Indicador
              </th>
              <th className="px-5 pb-7 text-left text-sm font-medium text-gray-500">
                Sucessos
              </th>
              <th className="px-5 pb-7 text-left text-sm font-medium text-gray-500">
                Falhas
              </th>
              <th className="px-5 pb-7 text-left text-sm font-medium text-gray-500">
                Total
              </th>
              <th className="px-5 pb-7 text-left text-sm font-medium text-gray-500">
                Taxa
              </th>
              <th className="px-5 pb-7 text-left text-sm font-medium text-gray-500">
                Variação
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <td className="px-5 py-8 text-sm font-medium leading-5 text-gray-950">
                  {item.indicator}
                </td>

                <td className="px-5 py-8 text-sm font-medium text-green-500">
                  {item.successes.value} {item.successes.label}
                </td>

                <td className="px-5 py-8 text-sm font-medium text-red-500">
                  {item.failures.value} {item.failures.label}
                </td>

                <td className="px-5 py-8 text-sm font-medium text-gray-900">
                  {item.total.value} {item.total.label}
                </td>

                <td className="px-5 py-8 text-sm font-medium text-gray-900">
                  {formatPercentage(item.rate)}
                </td>

                <td className="px-5 py-8">
                  <VariationBadge value={item.variation} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
