import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Check,
  CircleDollarSign,
  Landmark,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { PaycheckCalculator } from "@/features/calculator/PaycheckCalculator";
import { calculatePaycheck } from "@/features/calculator/tax";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { LegacyHashRouter } from "@/shared/components/LegacyHashRouter";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { faqs } from "@/shared/content/site";

const salaryExamples = [50_000, 75_000, 100_000, 150_000, 200_000].map(
  (salary) => {
    const result = calculatePaycheck({
      annualSalary: salary,
      payPeriods: 26,
      filingStatus: "single",
      pretaxPerPaycheck: 0,
    });
    return { salary, result };
  },
);

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

const taxLayers = [
  {
    number: "01",
    title: "Federal income tax",
    text: "Seven progressive brackets from 10% to 37%, after the 2026 standard deduction.",
    icon: Landmark,
  },
  {
    number: "02",
    title: "New York State",
    text: "Progressive state rates are applied after New York's standard deduction.",
    icon: Building2,
  },
  {
    number: "03",
    title: "New York City",
    text: "NYC residents pay a local income tax ranging from 3.078% to 3.876%.",
    icon: ReceiptText,
  },
  {
    number: "04",
    title: "FICA payroll tax",
    text: "Social Security, Medicare, and Additional Medicare Tax when applicable.",
    icon: CircleDollarSign,
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NYC Paycheck Calculator",
    url: "https://nycpaycheckcalculator.site",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Calculate 2026 NYC take-home pay after federal, New York State, New York City, and FICA taxes.",
    image: "https://nycpaycheckcalculator.site/logo.svg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LegacyHashRouter />

      <SiteHeader />

      <main>
        <section className="border-b border-stone-200">
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pt-28">
            <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                <BadgeCheck className="size-4" aria-hidden="true" />
                Updated for tax year 2026
              </div>
              <h1 className="text-balance text-5xl font-semibold leading-none text-stone-950 sm:text-6xl lg:text-7xl">
                Know what actually lands in your account.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-stone-600 sm:text-xl">
                A clearer NYC paycheck estimate—from gross salary to take-home pay
                after federal, state, city, and payroll taxes.
              </p>
              <CalculatorAction
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
              >
                Start with your salary
                <ArrowDown className="size-4" aria-hidden="true" />
              </CalculatorAction>
            </div>

            <PaycheckCalculator />

            <div className="mt-6 grid overflow-hidden rounded-2xl border border-stone-200 bg-white sm:grid-cols-3">
              {[
                [ShieldCheck, "2026 assumptions", "IRS, SSA & NY sources"],
                [LockKeyhole, "Private by design", "Nothing leaves your device"],
                [Check, "Free to use", "No signup or email required"],
              ].map(([Icon, title, description], index) => {
                const IconComponent = Icon as typeof ShieldCheck;
                return (
                  <div
                    key={String(title)}
                    className={`flex items-center gap-3 p-4 sm:p-5 ${index > 0 ? "border-t border-stone-200 sm:border-l sm:border-t-0" : ""}`}
                  >
                    <IconComponent className="size-5 shrink-0 text-emerald-700" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{String(title)}</p>
                      <p className="text-xs text-stone-500">{String(description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold text-emerald-700">Your four tax layers</p>
                <h2 className="text-balance text-4xl font-semibold text-stone-950 sm:text-5xl">
                  One paycheck. Four places it goes.
                </h2>
              </div>
              <p className="max-w-xl text-pretty text-base leading-7 text-stone-600 lg:justify-self-end">
                New Yorkers see more deductions on every pay stub than most workers.
                The calculator separates each payroll line—federal, state, city, and
                FICA—so you can compare a headline salary against the wage that
                actually lands, the same math your employer&rsquo;s payroll system runs
                behind the scenes.
              </p>
            </div>

            <div className="grid border-t border-stone-200 md:grid-cols-2">
              {taxLayers.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <article
                    key={layer.title}
                    className={`border-b border-stone-200 py-8 md:p-8 ${index % 2 === 0 ? "md:border-r" : ""}`}
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-sm font-medium tabular-nums text-stone-400">
                        {layer.number}
                      </span>
                      <Icon className="size-6 text-emerald-700" aria-hidden="true" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-stone-950">{layer.title}</h3>
                    <p className="max-w-md text-pretty text-sm leading-6 text-stone-600">
                      {layer.text}
                    </p>
                  </article>
                );
              })}
            </div>
            <Link
              href="/nyc-income-tax-guide/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Read the complete NYC income tax guide
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="border-y border-stone-200 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 text-sm font-semibold text-emerald-700">Salary snapshots</p>
              <h2 className="text-balance text-4xl font-semibold text-stone-950 sm:text-5xl">
                What common NYC salaries look like after tax.
              </h2>
              <p className="mt-5 text-pretty leading-7 text-stone-600">
                Single filer, standard deductions, no pre-tax contributions, paid bi-weekly.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
              <table className="w-full min-w-3xl border-collapse text-left">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-100 text-xs text-stone-600">
                    <th scope="col" className="px-5 py-4 font-semibold">Annual salary</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Gross / check</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Tax rate</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Net / check</th>
                    <th scope="col" className="px-5 py-4 font-semibold">Annual take-home</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {salaryExamples.map(({ salary, result }) => (
                    <tr key={salary} className="hover:bg-stone-50">
                      <td className="px-5 py-4 text-sm font-semibold tabular-nums text-stone-950">
                        {wholeMoney.format(salary)}
                      </td>
                      <td className="px-5 py-4 text-sm tabular-nums text-stone-600">
                        {money.format(result.perPaycheck.gross)}
                      </td>
                      <td className="px-5 py-4 text-sm tabular-nums text-stone-600">
                        {result.effectiveTaxRate.toFixed(1)}%
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold tabular-nums text-emerald-800">
                        {money.format(result.perPaycheck.net)}
                      </td>
                      <td className="px-5 py-4 text-sm tabular-nums text-stone-600">
                        {wholeMoney.format(result.annual.net)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              href="/nyc-salary-guide/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Explore the full NYC salary guide
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="bg-stone-950 py-20 text-white sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <p className="mb-3 text-sm font-semibold text-emerald-400">Methodology</p>
              <h2 className="text-balance text-4xl font-semibold sm:text-5xl">
                Transparent math, current assumptions.
              </h2>
              <p className="mt-6 max-w-lg text-pretty leading-7 text-stone-400">
                The estimate calculates annual liability first, then allocates it over
                your chosen pay schedule. That makes the math useful for comparing
                salaries while keeping every deduction visible.
              </p>
            </div>

            <div className="space-y-3 lg:col-span-6 lg:col-start-7">
              {[
                "Apply eligible pre-tax contributions to income-tax wages.",
                "Subtract the 2026 federal and New York standard deductions.",
                "Run taxable income through progressive federal, state, and city brackets.",
                "Add Social Security, Medicare, and Additional Medicare Tax when applicable.",
                "Subtract taxes and contributions from gross pay, then divide by pay periods.",
              ].map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-stone-800 p-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold tabular-nums text-stone-950">
                    {index + 1}
                  </span>
                  <p className="text-pretty text-sm leading-6 text-stone-300">{step}</p>
                </div>
              ))}

              <div className="pt-5">
                <p className="mb-3 text-xs font-semibold text-stone-500">Primary rate sources</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <a
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
                    href="https://www.irs.gov/irb/2025-45_IRB"
                    target="_blank"
                    rel="noreferrer"
                  >
                    IRS 2026 tables <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <a
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
                    href="https://www.ssa.gov/oact/COLA/cbb.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    SSA wage base <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                  <a
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
                    href="https://www.tax.ny.gov/pubs_and_bulls/publications/withholding/wt_pubs_and_bulls_by_number.htm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    NY 2026 tables <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <Link
                href="/paycheck-calculator-methodology/"
                className="inline-flex items-center gap-2 pt-3 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Review the full calculation methodology
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-4">
              <p className="mb-3 text-sm font-semibold text-emerald-700">Good to know</p>
              <h2 className="text-balance text-4xl font-semibold text-stone-950 sm:text-5xl">
                Questions, answered plainly.
              </h2>
            </div>
            <div className="divide-y divide-stone-200 border-y border-stone-200 lg:col-span-7 lg:col-start-6">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-stone-950 marker:hidden">
                    {faq.question}
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-stone-300 text-lg font-normal text-stone-500 group-open:bg-stone-950 group-open:text-white">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-10 text-pretty text-sm leading-7 text-stone-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
              <Link
                href="/nyc-paycheck-calculator-faq/"
                className="inline-flex items-center gap-2 py-5 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
              >
                View all calculator questions
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-stone-200 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-3xl bg-emerald-100 p-8 sm:p-12 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <Banknote className="mb-6 size-8 text-emerald-800" aria-hidden="true" />
              <h2 className="text-balance text-3xl font-semibold text-stone-950 sm:text-5xl">
                A salary number is only useful when you know what you keep.
              </h2>
            </div>
            <CalculatorAction
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-stone-950 px-5 text-sm font-semibold text-white hover:bg-stone-800"
            >
              Calculate take-home
              <ArrowRight className="size-4" aria-hidden="true" />
            </CalculatorAction>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
