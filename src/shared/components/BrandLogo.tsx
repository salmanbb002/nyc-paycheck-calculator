import { cn } from "@/shared/lib/cn";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className, compact = false }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden="true"
        className="size-9 shrink-0 sm:size-10"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="14" fill="#0C0A09" />
        <path
          d="M11 30V21.5a2 2 0 0 1 2-2h4V15a2 2 0 0 1 2-2h4v17H11Z"
          fill="#34D399"
        />
        <path d="M27 13h6a2 2 0 0 1 2 2v9.5h-8V13Z" fill="#10B981" />
        <path
          d="m20 31.25 4.25 4.25L37 22.75"
          stroke="#F5F5F4"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-700 sm:text-[10px]">
          NYC Paycheck
        </span>
        <span
          className={cn(
            "mt-1 whitespace-nowrap text-sm font-semibold tracking-[-0.02em] text-stone-950 sm:text-[15px]",
            compact && "text-[13px] sm:text-sm",
          )}
        >
          Calculator
        </span>
      </span>
    </span>
  );
}
