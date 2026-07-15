import type { Metadata } from "next";
import { GuidePage } from "@/shared/components/GuidePage";
import { createArticleJsonLd, createPageMetadata } from "@/shared/lib/seo";

const path = "/paycheck-calculator-methodology/";
const title = "Paycheck Calculator Methodology";
const description =
  "See how the NYC Paycheck Calculator estimates 2026 take-home pay, including assumptions, tax order, data sources, and important limitations.";

export const metadata: Metadata = createPageMetadata({ title, description, path });

const steps = [
  {
    title: "Normalize annual salary",
    text: "The calculator starts with annual gross W-2 wages and divides the final result by the selected number of pay periods.",
  },
  {
    title: "Apply eligible pre-tax contributions",
    text: "Entered contributions reduce income-tax wages. For a conservative estimate, FICA remains calculated on gross wages.",
  },
  {
    title: "Calculate taxable income",
    text: "The 2026 federal and New York standard deductions are subtracted before progressive income-tax brackets are applied.",
  },
  {
    title: "Calculate federal, state, and city taxes",
    text: "Each jurisdiction is calculated separately through its progressive brackets instead of applying one flat rate to the full salary.",
  },
  {
    title: "Add FICA payroll taxes",
    text: "Social Security, Medicare, and Additional Medicare Tax are added when applicable, including the annual Social Security wage base.",
  },
  {
    title: "Calculate take-home pay",
    text: "Estimated taxes and pre-tax contributions are subtracted from gross salary, then annual net pay is divided across the chosen pay schedule.",
  },
];

export default function MethodologyPage() {
  const structuredData = createArticleJsonLd({ title, description, path });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GuidePage
        currentPath={path}
        eyebrow="Calculation methodology"
        title="Transparent paycheck math, step by step"
        description="The calculator estimates annual tax liability first and then allocates the result across your selected pay schedule. Every major tax layer remains visible."
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">How the estimate is calculated</h2>
          <ol className="mt-8 space-y-4">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-5 rounded-2xl border border-stone-200 p-6">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold tabular-nums text-emerald-900">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-stone-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">Core 2026 assumptions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "W-2 employee and full-year NYC resident",
              "Single or married filing jointly",
              "Federal and New York standard deductions",
              "$184,500 Social Security wage base",
              "No dependents or special tax credits",
              "No itemized deductions or high-income recapture",
            ].map((assumption) => (
              <div key={assumption} className="rounded-2xl bg-stone-100 p-5 text-sm font-medium leading-6 text-stone-700">
                {assumption}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-stone-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold">What the estimate does not model</h2>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            The calculation does not model every W-4 or IT-2104 election, dependents,
            itemized deductions, refundable credits, multiple jobs, bonuses, stock
            compensation, garnishments, employer benefits, or every high-income tax rule.
            It is a planning estimate, not tax preparation or payroll advice.
          </p>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <h2 className="text-2xl font-semibold text-stone-950">Primary sources</h2>
          <p className="mt-3 leading-7 text-stone-600">
            Assumptions are checked against publications from the IRS, Social Security
            Administration, and New York State Department of Taxation and Finance.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:border-stone-950" href="https://www.irs.gov/irb/2025-45_IRB" target="_blank" rel="noreferrer">IRS tables</a>
            <a className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:border-stone-950" href="https://www.ssa.gov/oact/COLA/cbb.html" target="_blank" rel="noreferrer">SSA wage base</a>
            <a className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:border-stone-950" href="https://www.tax.ny.gov/pubs_and_bulls/publications/withholding/wt_pubs_and_bulls_by_number.htm" target="_blank" rel="noreferrer">New York tables</a>
          </div>
        </section>
      </GuidePage>
    </>
  );
}
