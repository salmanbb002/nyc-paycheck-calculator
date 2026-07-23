import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { calculatePaycheck } from "@/features/calculator/tax";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { GuidePage } from "@/shared/components/GuidePage";
import { createArticleJsonLd, createPageMetadata } from "@/shared/lib/seo";

const path = "/nyc-minimum-wage-guide/";
const title = "New York Minimum Wage 2026 | NYC, Long Island & Westchester Rates";
const description =
  "The current New York minimum wage by region for 2026: New York City, Long Island, and Westchester County versus the rest of the state, plus what it means for take-home pay.";

export const metadata: Metadata = createPageMetadata({ title, description, path });

const wholeMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const FULL_TIME_ANNUAL_HOURS = 2_080;

const wageRegions = [
  {
    region: "New York City",
    detail: "Manhattan, Brooklyn, Queens, the Bronx, and Staten Island",
    hourly: 17,
  },
  {
    region: "Long Island",
    detail: "Nassau and Suffolk counties",
    hourly: 17,
  },
  {
    region: "Westchester County",
    detail: "All of Westchester County",
    hourly: 17,
  },
  {
    region: "Rest of New York State",
    detail: "Every other county",
    hourly: 16,
  },
];

const nycMinimumWageResult = calculatePaycheck({
  annualSalary: 17 * FULL_TIME_ANNUAL_HOURS,
  payPeriods: 26,
  filingStatus: "single",
  pretaxPerPaycheck: 0,
});

export default function MinimumWageGuide() {
  const structuredData = createArticleJsonLd({ title, description, path });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GuidePage
        currentPath={path}
        eyebrow="Minimum wage guide"
        title="What is the New York minimum wage right now?"
        description="Since January 1, 2026, New York's minimum wage is $17 an hour in New York City, Long Island, and Westchester County, and $16 an hour across the rest of the state."
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            The current minimum wage in New York State, by region
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            New York sets its minimum wage in two tiers. New York City, Long Island
            (Nassau and Suffolk counties), and Westchester County share one rate; every
            other county in the state follows a second, lower rate. Both tiers rose on
            January 1, 2026, under the schedule the state legislature and Governor
            Hochul set in 2023.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full min-w-2xl border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100 text-xs text-stone-600">
                  <th scope="col" className="px-5 py-4 font-semibold">Region</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Counties / boroughs</th>
                  <th scope="col" className="px-5 py-4 font-semibold">2026 hourly minimum</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Full-time annual (2,080 hrs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {wageRegions.map((row) => (
                  <tr key={row.region} className="hover:bg-stone-50">
                    <td className="px-5 py-4 text-sm font-semibold text-stone-950">{row.region}</td>
                    <td className="px-5 py-4 text-sm text-stone-600">{row.detail}</td>
                    <td className="px-5 py-4 text-sm font-semibold tabular-nums text-emerald-800">
                      {money.format(row.hourly)}/hr
                    </td>
                    <td className="px-5 py-4 text-sm tabular-nums text-stone-600">
                      {wholeMoney.format(row.hourly * FULL_TIME_ANNUAL_HOURS)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-pretty text-sm leading-6 text-stone-500">
            Queens, Brooklyn, the Bronx, Manhattan, and Staten Island all fall under the
            same New York City rate—there is no separate borough-by-borough minimum
            wage.
          </p>
        </section>

        <section className="rounded-3xl bg-stone-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold">Why the rate depends on where you work</h2>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            New York's minimum wage law is based on where the work is performed, not
            where the employer is headquartered or where the employee lives. A worker
            who lives in Westchester but clocks in at a job site in the Bronx is covered
            by the New York City rate for those hours.
          </p>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            For the full story on the 2026 increase and what changes in 2027, read{" "}
            <Link
              href="/blog/ny-minimum-wage-2026-increase/"
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              New York&rsquo;s 2026 minimum wage increase, explained
            </Link>{" "}
            on the blog.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            What minimum wage looks like as take-home pay
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            A full-time New York City minimum-wage salary comes to roughly{" "}
            {wholeMoney.format(17 * FULL_TIME_ANNUAL_HOURS)} a year before taxes. Running
            that figure through the paycheck calculator gives an estimated{" "}
            {money.format(nycMinimumWageResult.perPaycheck.net)} net on a bi-weekly
            check, or about {wholeMoney.format(nycMinimumWageResult.annual.net)}{" "}
            annually—an effective tax rate near{" "}
            {nycMinimumWageResult.effectiveTaxRate.toFixed(1)}%. At this income level,
            the calculator's estimate is conservative: it does not model the Earned
            Income Tax Credit, the New York State or NYC EITC, or other credits that
            typically increase a low-wage worker's actual refund and effective
            take-home pay.
          </p>
          <CalculatorAction className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950">
            Estimate your own take-home pay
            <ArrowRight className="size-4" aria-hidden="true" />
          </CalculatorAction>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">What comes next</h2>
          <p className="mt-4 text-pretty leading-7 text-stone-600">
            Under the 2023 law, 2026 is the last scheduled fixed-dollar increase.
            Starting in 2027, New York's minimum wage will adjust automatically each
            year based on the Consumer Price Index for Urban Wage Earners and Clerical
            Workers (CPI-W) for the Northeast region, rather than a rate set directly by
            the legislature.
          </p>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <h2 className="text-2xl font-semibold text-stone-950">Official sources</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6">
            <li>
              <a
                className="font-semibold text-emerald-800 hover:text-emerald-950"
                href="https://www.ny.gov/programs/new-york-states-minimum-wage"
                target="_blank"
                rel="noreferrer"
              >
                New York State: Raising the Minimum Wage
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-emerald-800 hover:text-emerald-950"
                href="https://www.governor.ny.gov/news/money-your-pockets-governor-hochul-reminds-new-yorkers-minimum-wage-increase-january-1"
                target="_blank"
                rel="noreferrer"
              >
                Governor Hochul: 2026 minimum wage increase announcement
              </a>
            </li>
          </ul>
        </section>
      </GuidePage>
    </>
  );
}
