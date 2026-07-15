import type { Metadata } from "next";
import { GuidePage } from "@/shared/components/GuidePage";
import { createArticleJsonLd, createPageMetadata } from "@/shared/lib/seo";

const path = "/nyc-income-tax-guide/";
const title = "NYC Income Tax Guide 2026";
const description =
  "Understand the federal, New York State, New York City, and FICA taxes that reduce an NYC paycheck, with 2026 rates and practical examples.";

export const metadata: Metadata = createPageMetadata({ title, description, path });

const taxLayers = [
  {
    title: "Federal income tax",
    rate: "10%–37%",
    text: "Federal taxable income is calculated after eligible pre-tax deductions and the applicable standard deduction, then taxed through progressive brackets.",
  },
  {
    title: "New York State income tax",
    rate: "3.9%–10.9%",
    text: "New York applies its own standard deduction and progressive brackets. The rate shown on a bracket is not the rate applied to every dollar you earn.",
  },
  {
    title: "New York City resident tax",
    rate: "3.078%–3.876%",
    text: "Full-year NYC residents generally pay city income tax. Most people who only commute into the city do not pay this resident tax.",
  },
  {
    title: "FICA payroll taxes",
    rate: "Social Security + Medicare",
    text: "Employees pay Social Security and Medicare through payroll. Additional Medicare Tax can apply above the relevant income threshold.",
  },
];

export default function NycIncomeTaxGuide() {
  const structuredData = createArticleJsonLd({ title, description, path });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GuidePage
        currentPath={path}
        eyebrow="NYC tax guide"
        title="The four taxes that shape an NYC paycheck"
        description="An NYC paycheck can include federal income tax, New York State tax, New York City resident tax, and FICA payroll taxes. Each layer uses different rules, so your marginal bracket is not your overall tax rate."
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            What taxes come out of an NYC paycheck?
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            A W-2 employee who lives in New York City will usually see four major tax
            layers. Employer withholding can differ from estimated annual liability, but
            these are the core deductions used by the calculator.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {taxLayers.map((layer, index) => (
              <article key={layer.title} className="rounded-2xl border border-stone-200 p-6">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span className="text-xs font-bold tabular-nums text-emerald-700">
                    0{index + 1}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {layer.rate}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-stone-950">{layer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{layer.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-stone-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold">Who pays New York City income tax?</h2>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            NYC resident income tax generally applies to full-year and part-year residents
            of the five boroughs. It is based on residency, not simply where an employer is
            located. A nonresident commuter usually pays federal and New York State taxes,
            but not NYC resident tax.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            Why your top bracket is not your effective tax rate
          </h2>
          <p className="mt-4 text-pretty leading-7 text-stone-600">
            Federal, state, and city income taxes are progressive. Only the income inside a
            bracket is taxed at that bracket’s rate. The calculator totals every layer and
            divides total estimated taxes by gross salary to show an effective tax rate.
          </p>
          <p className="mt-4 text-pretty leading-7 text-stone-600">
            Pre-tax contributions can reduce income-tax wages, while Social Security and
            Medicare may still apply. Actual withholding can also change with W-4 and
            IT-2104 elections, dependents, credits, bonuses, and multiple jobs.
          </p>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <h2 className="text-2xl font-semibold text-stone-950">Official rate sources</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6">
            <li>
              <a
                className="font-semibold text-emerald-800 hover:text-emerald-950"
                href="https://www.irs.gov/irb/2025-45_IRB"
                target="_blank"
                rel="noreferrer"
              >
                IRS 2026 federal tax tables
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-emerald-800 hover:text-emerald-950"
                href="https://www.ssa.gov/oact/COLA/cbb.html"
                target="_blank"
                rel="noreferrer"
              >
                Social Security contribution and benefit base
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-emerald-800 hover:text-emerald-950"
                href="https://www.tax.ny.gov/pubs_and_bulls/publications/withholding/wt_pubs_and_bulls_by_number.htm"
                target="_blank"
                rel="noreferrer"
              >
                New York withholding publications
              </a>
            </li>
          </ul>
        </section>
      </GuidePage>
    </>
  );
}
