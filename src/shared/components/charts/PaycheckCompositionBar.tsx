type Segment = {
  label: string;
  value: number;
  color: string;
};

type PaycheckCompositionBarProps = {
  title: string;
  segments: Segment[];
  caption: string;
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function PaycheckCompositionBar({ title, segments, caption }: PaycheckCompositionBarProps) {
  const total = Math.max(
    segments.reduce((sum, segment) => sum + segment.value, 0),
    1,
  );

  return (
    <figure className="rounded-3xl bg-stone-950 p-6 text-white sm:p-8">
      <p className="text-sm font-semibold text-stone-100">{title}</p>
      <div
        role="img"
        aria-label={segments
          .map((segment) => `${segment.label}: ${Math.round((segment.value / total) * 100)}%`)
          .join(", ")}
        className="mt-5 flex h-3 overflow-hidden rounded-full bg-stone-800"
      >
        {segments.map((segment) => (
          <span
            key={segment.label}
            className={`h-full ${segment.color}`}
            style={{ width: `${(segment.value / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone-400">
        {segments.map((segment) => (
          <li key={segment.label} className="inline-flex items-center gap-2">
            <span className={`size-2 rounded-full ${segment.color}`} aria-hidden="true" />
            {segment.label}
            <span className="tabular-nums text-stone-300">
              {money.format(segment.value)}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-5 text-pretty text-xs leading-5 text-stone-500">{caption}</figcaption>
    </figure>
  );
}
