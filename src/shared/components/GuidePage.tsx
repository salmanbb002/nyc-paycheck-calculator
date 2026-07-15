import { ArrowRight, CalendarDays, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { primaryNavigation } from "@/shared/content/site";

type GuidePageProps = {
  currentPath: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function GuidePage({
  currentPath,
  eyebrow,
  title,
  description,
  children,
}: GuidePageProps) {
  const relatedPages = primaryNavigation.filter((item) => item.href !== currentPath);

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-stone-950">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page" className="text-stone-700">
              {eyebrow}
            </span>
          </nav>
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold text-emerald-700">{eyebrow}</p>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-stone-950 sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-stone-600 sm:text-xl">
              {description}
            </p>
            <p className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-stone-500">
              <CalendarDays className="size-4 text-emerald-700" aria-hidden="true" />
              Last updated July 16, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <article className="min-w-0 space-y-12 lg:col-span-8">{children}</article>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="space-y-7 rounded-3xl border border-stone-200 bg-stone-50 p-6 lg:sticky lg:top-24">
              <div>
                <p className="text-sm font-semibold text-stone-950">Run your own numbers</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Get an instant estimate using your salary, pay schedule, filing status,
                  and pre-tax deductions.
                </p>
                <CalculatorAction className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-stone-800">
                  Open calculator
                  <ArrowRight className="size-4" aria-hidden="true" />
                </CalculatorAction>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Related resources
                </p>
                <nav aria-label="Related resources" className="space-y-3">
                  {relatedPages.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-3 text-sm font-medium text-stone-700 hover:text-emerald-800"
                    >
                      {item.label}
                      <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
