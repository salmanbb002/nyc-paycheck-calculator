import type { Metadata } from "next";
import Link from "next/link";
import { calculatePaycheck } from "@/features/calculator/tax";
import { GuidePage } from "@/shared/components/GuidePage";
import { createArticleJsonLd, createPageMetadata } from "@/shared/lib/seo";

const path = "/nyc-salary-guide/";
const title = "NYC Salary After Taxes Guide 2026";
const description =
  "Compare estimated 2026 NYC take-home pay for common salaries, including bi-weekly net pay, annual net income, and effective tax rates.";

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

const salaryExamples = [50_000, 60_000, 75_000, 85_000, 100_000, 125_000, 150_000, 200_000].map(
  (salary) => ({
    salary,
    result: calculatePaycheck({
      annualSalary: salary,
      payPeriods: 26,
      filingStatus: "single",
      pretaxPerPaycheck: 0,
    }),
  }),
);

export default function NycSalaryGuide() {
  const structuredData = createArticleJsonLd({ title, description, path });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GuidePage
        currentPath={path}
        eyebrow="NYC salary guide"
        title="What common NYC salaries look like after taxes"
        description="These 2026 estimates compare gross salary with bi-weekly and annual take-home pay for a single NYC resident using standard deductions and no pre-tax contributions."
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            NYC salary after-tax estimates for 2026
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            The table uses 26 pay periods per year and estimates federal, New York State,
            New York City, Social Security, and Medicare taxes. Think of it as a net
            salary calculator for common income levels—gross in, net salary out—rather
            than a substitute for exact payroll withholding.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full min-w-3xl border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100 text-xs text-stone-600">
                  <th scope="col" className="px-5 py-4 font-semibold">Salary</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Net / check</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Monthly net</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Annual net</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Tax rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {salaryExamples.map(({ salary, result }) => (
                  <tr key={salary} className="hover:bg-stone-50">
                    <td className="px-5 py-4 text-sm font-semibold tabular-nums text-stone-950">
                      {wholeMoney.format(salary)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold tabular-nums text-emerald-800">
                      {money.format(result.perPaycheck.net)}
                    </td>
                    <td className="px-5 py-4 text-sm tabular-nums text-stone-600">
                      {money.format(result.monthlyNet)}
                    </td>
                    <td className="px-5 py-4 text-sm tabular-nums text-stone-600">
                      {wholeMoney.format(result.annual.net)}
                    </td>
                    <td className="px-5 py-4 text-sm tabular-nums text-stone-600">
                      {result.effectiveTaxRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            ["Filing status", "Single"],
            ["Pay schedule", "Bi-weekly"],
            ["Pre-tax deductions", "$0"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-xs font-semibold text-emerald-800">{label}</p>
              <p className="mt-2 text-lg font-semibold text-stone-950">{value}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            Using this as a New York State salary calculator, not just an NYC one
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            Every row above includes New York City resident tax. If you work in the
            five boroughs but live elsewhere in New York State—Westchester, Long
            Island, or upstate—drop that one line. The federal and New York State
            brackets still apply to any New York worker, so the same gross-to-net
            math works as a New York State salary calculator once the city tax is
            removed.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            Why two people with the same salary can take home different amounts
          </h2>
          <p className="mt-4 text-pretty leading-7 text-stone-600">
            Filing status, retirement contributions, health benefits, transit benefits,
            dependents, credits, bonuses, and multiple jobs can all change withholding or
            annual tax liability. Pay frequency changes the amount per check, but does not
            by itself change annual salary.
          </p>
        </section>

        <section className="rounded-3xl bg-stone-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold">Use salary tables as a comparison, not a pay stub</h2>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            These figures use simplified annual calculations. Your employer’s payroll
            system follows withholding elections and may produce a different check amount.
            Enter your own details in the calculator for a more relevant estimate.
          </p>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            For a plain-language walkthrough of why gross and net pay diverge, read{" "}
            <Link
              href="/blog/salary-vs-take-home-pay-nyc/"
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Salary vs. take-home pay in NYC
            </Link>{" "}
            on the blog.
          </p>
        </section>
      </GuidePage>
    </>
  );
}
