import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { calculatePaycheck } from "@/features/calculator/tax";
import { BlogLayout } from "@/shared/components/BlogLayout";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { BlogHeroArt } from "@/shared/components/illustrations/BlogHeroArt";
import { PaycheckCompositionBar } from "@/shared/components/charts/PaycheckCompositionBar";
import { getBlogPost } from "@/shared/content/blog";
import { createBlogPostingJsonLd, createPageMetadata } from "@/shared/lib/seo";

const post = getBlogPost("salary-vs-take-home-pay-nyc")!;
const path = `/blog/${post.slug}/`;

export const metadata: Metadata = createPageMetadata({
  title: post.title,
  description: post.dek,
  path,
  image: `/blog/${post.slug}-og.png`,
});

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const wholeMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const exampleSalary = 85_000;
const example = calculatePaycheck({
  annualSalary: exampleSalary,
  payPeriods: 26,
  filingStatus: "single",
  pretaxPerPaycheck: 0,
});

const lowerSalary = calculatePaycheck({
  annualSalary: 50_000,
  payPeriods: 26,
  filingStatus: "single",
  pretaxPerPaycheck: 0,
});

const higherSalary = calculatePaycheck({
  annualSalary: 200_000,
  payPeriods: 26,
  filingStatus: "single",
  pretaxPerPaycheck: 0,
});

const faq = [
  {
    question: "How much tax is deducted from a paycheck in NY?",
    answer:
      "For an NYC resident, four layers come out of gross pay: federal income tax, New York State income tax, New York City resident tax, and FICA (Social Security and Medicare). Combined, they typically remove somewhere between a fifth and a third of gross pay, depending on income—lower earners lose closer to 20%, higher earners closer to 35%, because federal, state, and city brackets are all progressive.",
  },
  {
    question: "Is net pay the same as take-home pay?",
    answer:
      "Yes. Net pay, take-home pay, and salary take-home all refer to the same figure: what's left after taxes and pre-tax deductions are subtracted from gross wages.",
  },
  {
    question: "Why did my raise not change my paycheck by the full amount?",
    answer:
      "Because tax brackets are progressive, a raise is taxed at your marginal rate on the new income, not your entire salary at a higher rate. A $5,000 raise near the top of a bracket can net out to less take-home increase than the same raise near the bottom of a bracket, especially once it pushes overtime or bonus income into a higher federal bracket.",
  },
  {
    question: "Do bonuses get taxed differently than salary?",
    answer:
      "Employers often withhold bonuses at a flat supplemental rate rather than your regular payroll rate, which is why a bonus check can look more heavily taxed than a normal paycheck. Your actual annual tax liability, calculated when you file, treats bonus income the same as any other wages.",
  },
];

const structuredData = createBlogPostingJsonLd({
  title: post.title,
  description: post.dek,
  path,
  datePublished: post.publishedDate,
  dateModified: post.updatedDate,
  faq,
});

export default function SalaryVsTakeHomeBlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogLayout
        slug={post.slug}
        category={post.category}
        title={post.title}
        dek={post.dek}
        publishedDate={post.publishedDate}
        updatedDate={post.updatedDate}
        readTime={post.readTime}
        heroArt={<BlogHeroArt variant={post.heroVariant} title={post.title} />}
        relatedGuides={[
          { label: "NYC income tax guide", href: "/nyc-income-tax-guide/" },
          { label: "NYC salary guide", href: "/nyc-salary-guide/" },
          { label: "Calculator methodology", href: "/paycheck-calculator-methodology/" },
        ]}
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            Salary is a promise. Take-home pay is a receipt.
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            An offer letter states <strong>gross salary</strong>—the full amount your
            employer agrees to pay before anything is withheld. <strong>Take-home
            pay</strong> (also called net pay, or salary take-home) is what actually
            lands in your bank account after federal income tax, New York State
            income tax, New York City resident tax, FICA payroll taxes, and any
            pre-tax deductions are subtracted. For an NYC resident, the gap between
            those two numbers is larger than almost anywhere else in the country,
            because New York City is one of the few places in the U.S. that layers a
            local income tax on top of state and federal tax.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            Where a $85,000 NYC salary actually goes
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            Take a single filer earning {wholeMoney.format(exampleSalary)} a year,
            paid bi-weekly with no pre-tax deductions—a common baseline case. The
            2026 estimate breaks down like this:
          </p>

          <div className="mt-8">
            <PaycheckCompositionBar
              title={`How ${wholeMoney.format(exampleSalary)} in gross salary splits up annually`}
              segments={[
                { label: "Take-home", value: example.annual.net, color: "bg-emerald-400" },
                { label: "Federal", value: example.annual.federal, color: "bg-stone-300" },
                { label: "NY State", value: example.annual.state, color: "bg-stone-400" },
                { label: "NYC", value: example.annual.city, color: "bg-stone-500" },
                { label: "FICA", value: example.annual.fica, color: "bg-stone-600" },
              ]}
              caption={`Single filer, bi-weekly pay, no pre-tax deductions, 2026 rates. Estimated with the NYC paycheck calculator; effective tax rate ${example.effectiveTaxRate.toFixed(1)}%.`}
            />
          </div>

          <p className="mt-6 max-w-3xl text-pretty leading-7 text-stone-600">
            That works out to {money.format(example.perPaycheck.net)} net on a
            bi-weekly check, or {wholeMoney.format(example.annual.net)} a year—about{" "}
            {example.takeHomeRate.toFixed(0)}% of gross salary. The remaining{" "}
            {(100 - example.takeHomeRate).toFixed(0)}% didn&rsquo;t disappear; it went
            to four specific places, each with its own rules.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            Why your top tax bracket isn&rsquo;t your tax rate
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            Federal, state, and city income taxes are all <strong>progressive</strong>:
            only the income inside a given bracket is taxed at that bracket&rsquo;s
            rate. Being &ldquo;in the 24% federal bracket&rdquo; does not mean 24% of
            your salary goes to federal tax—it means your last dollar earned is taxed
            at 24%, while everything below it was taxed at lower rates on the way up.
            The number that actually matters for take-home pay is your{" "}
            <strong>effective tax rate</strong>: total tax divided by gross salary.
          </p>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            That's also why take-home pay doesn&rsquo;t scale in a straight line with
            salary. A {wholeMoney.format(50_000)} single filer keeps about{" "}
            {lowerSalary.takeHomeRate.toFixed(0)}% of gross pay; at{" "}
            {wholeMoney.format(200_000)}, that share drops to roughly{" "}
            {higherSalary.takeHomeRate.toFixed(0)}%, mostly because Social Security tax
            stops once wages pass the annual wage base, while Medicare, state, and city
            brackets keep climbing. See the full{" "}
            <Link
              href="/nyc-salary-guide/"
              className="font-semibold text-emerald-800 hover:text-emerald-950"
            >
              salary-by-salary breakdown
            </Link>{" "}
            for more income levels.
          </p>
        </section>

        <section className="rounded-3xl bg-emerald-50 p-7 sm:p-9">
          <h2 className="text-2xl font-semibold text-stone-950">
            Where does &ldquo;payroll tax&rdquo; fit in?
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-7 text-stone-600">
            FICA—Social Security and Medicare—is technically separate from income tax,
            but it comes out of the same paycheck, which is why people often lump it
            in under &ldquo;payroll taxes.&rdquo; Unlike income tax, FICA is not
            progressive in the same way: Social Security is a flat 6.2% up to the
            annual wage base ($184,500 for 2026), and Medicare is a flat 1.45% on all
            wages, plus an extra 0.9% above $200,000 for single filers. Traditional
            pre-tax 401(k) contributions reduce your income-tax wages, but not your
            FICA wages—FICA still applies to the full amount you were paid.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            Why your pay stub might not match this estimate
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            A paycheck calculator estimates annual tax liability and spreads it
            evenly across your pay periods. Your employer&rsquo;s actual payroll
            system withholds based on your W-4 and IT-2104 elections, and can include
            dependents, benefits, multiple jobs, or a bonus processed at a
            supplemental withholding rate. Small differences between an estimate and
            a real pay stub are normal—see the full{" "}
            <Link
              href="/paycheck-calculator-methodology/"
              className="font-semibold text-emerald-800 hover:text-emerald-950"
            >
              calculation methodology
            </Link>{" "}
            for exactly what is and isn&rsquo;t modeled.
          </p>
          <CalculatorAction className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950">
            Estimate your own take-home pay
            <ArrowRight className="size-4" aria-hidden="true" />
          </CalculatorAction>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <h2 className="text-2xl font-semibold text-stone-950">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
            {faq.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-stone-950 marker:hidden">
                  {item.question}
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-stone-300 text-lg font-normal text-stone-500 group-open:bg-stone-950 group-open:text-white">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-10 text-pretty text-sm leading-7 text-stone-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <h2 className="text-2xl font-semibold text-stone-950">Sources</h2>
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
      </BlogLayout>
    </>
  );
}
