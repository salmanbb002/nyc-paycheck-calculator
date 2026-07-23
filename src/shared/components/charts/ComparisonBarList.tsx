type ComparisonRow = {
  label: string;
  value: number;
  displayValue: string;
  helper?: string;
};

type ComparisonBarListProps = {
  title: string;
  rows: ComparisonRow[];
  caption: string;
};

export function ComparisonBarList({ title, rows, caption }: ComparisonBarListProps) {
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <figure className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-stone-950">{title}</p>
      <div className="mt-6 space-y-5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-stone-700">
                {row.label}
                {row.helper ? (
                  <span className="ml-2 text-xs font-normal text-stone-400">{row.helper}</span>
                ) : null}
              </span>
              <span className="shrink-0 text-sm font-semibold tabular-nums text-emerald-800">
                {row.displayValue}
              </span>
            </div>
            <div
              role="img"
              aria-label={`${row.label}: ${row.displayValue}`}
              className="h-3 overflow-hidden rounded-full bg-stone-100"
            >
              <span
                className="block h-full rounded-full bg-emerald-600"
                style={{ width: `${Math.max((row.value / max) * 100, 4)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-6 border-t border-stone-100 pt-4 text-pretty text-xs leading-5 text-stone-500">
        {caption}
      </figcaption>
    </figure>
  );
}
