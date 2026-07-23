import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { calculatePaycheck } from "@/features/calculator/tax";
import { BlogLayout } from "@/shared/components/BlogLayout";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { ComparisonBarList } from "@/shared/components/charts/ComparisonBarList";
import { BlogHeroArt } from "@/shared/components/illustrations/BlogHeroArt";
import { getBlogPost } from "@/shared/content/blog";
import { createBlogPostingJsonLd, createPageMetadata } from "@/shared/lib/seo";

const post = getBlogPost("nyc-teacher-salary-affordable-housing")!;
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

const baSalary = 68_902;
const maSalary = 77_455;

const baResult = calculatePaycheck({
  annualSalary: baSalary,
  payPeriods: 26,
  filingStatus: "single",
  pretaxPerPaycheck: 0,
});
const maResult = calculatePaycheck({
  annualSalary: maSalary,
  payPeriods: 26,
  filingStatus: "single",
  pretaxPerPaycheck: 0,
});

const suggestedRentAt30Percent = (baSalary * 0.3) / 12;

const faq = [
  {
    question: "How much do NYC teachers take home after taxes?",
    answer:
      `A first-year single teacher starting on a bachelor's-degree salary of ${wholeMoney.format(baSalary)} takes home an estimated ${money.format(baResult.perPaycheck.net)} per bi-weekly check, or about ${wholeMoney.format(baResult.annual.net)} a year, after federal, New York State, New York City, and FICA taxes. On a master's-degree starting salary of ${wholeMoney.format(maSalary)}, that's about ${money.format(maResult.perPaycheck.net)} per check.`,
  },
  {
    question: "Does a teacher's salary qualify for NYC affordable housing?",
    answer:
      "It depends on the specific lottery. A single teacher's gross salary generally exceeds the income ceiling for the lowest-income affordable housing bands (30% and 50% of Area Median Income) but falls under the ceiling for low- and moderate-income bands (80% and 120% AMI), so many—but not all—affordable housing lotteries remain open to a starting teacher's income.",
  },
  {
    question: "What is the NYC DOE starting teacher salary?",
    answer:
      `As of September 14, 2025, a new teacher with no prior experience starts at ${wholeMoney.format(baSalary)} with a bachelor's degree or ${wholeMoney.format(maSalary)} with a master's degree, under the current UFT contract.`,
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

export default function TeacherSalaryHousingBlogPost() {
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
          { label: "NYC DOE teacher salary guide", href: "/nyc-doe-teacher-salary-guide/" },
          { label: "NYC affordable housing guide", href: "/nyc-affordable-housing-guide/" },
          { label: "NYC salary guide", href: "/nyc-salary-guide/" },
        ]}
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            What a first-year NYC teacher actually earns
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            NYC public school teachers are paid on a single UFT-negotiated salary
            schedule, not by individual school budget. As of September 14, 2025, a new
            teacher with no prior experience starts at{" "}
            {wholeMoney.format(baSalary)} with a bachelor&rsquo;s degree, or{" "}
            {wholeMoney.format(maSalary)} with a master&rsquo;s degree. From there,
            salary rises by step (years of service) and differential (additional
            credits or advanced degrees)—the full mechanics are in the{" "}
            <Link
              href="/nyc-doe-teacher-salary-guide/"
              className="font-semibold text-emerald-800 hover:text-emerald-950"
            >
              DOE teacher salary guide
            </Link>
            . What matters for this piece is simpler: what does that public,
            published salary actually turn into once taxes come out, and how far does
            it go in a city where affordable housing itself is means-tested?
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            From gross salary to net paycheck
          </h2>
          <div className="mt-8">
            <ComparisonBarList
              title="Estimated net pay per bi-weekly check, 2026"
              rows={[
                {
                  label: "Bachelor's degree",
                  value: baResult.perPaycheck.net,
                  displayValue: money.format(baResult.perPaycheck.net),
                  helper: wholeMoney.format(baSalary) + " gross",
                },
                {
                  label: "Master's degree",
                  value: maResult.perPaycheck.net,
                  displayValue: money.format(maResult.perPaycheck.net),
                  helper: wholeMoney.format(maSalary) + " gross",
                },
              ]}
              caption="Single filer, 26 pay periods, no pre-tax deductions, 2026 federal/NY/NYC/FICA rates. Does not include TRS pension contributions, which further reduce income-tax wages."
            />
          </div>
          <p className="mt-6 max-w-3xl text-pretty leading-7 text-stone-600">
            In monthly terms, that&rsquo;s roughly {money.format(baResult.monthlyNet)}{" "}
            for a bachelor&rsquo;s-degree starting teacher and{" "}
            {money.format(maResult.monthlyNet)} for a master&rsquo;s-degree starting
            teacher—before accounting for the mandatory Teachers&rsquo; Retirement
            System (TRS) pension contribution, which would reduce income-tax wages
            further and lower these estimates slightly.
          </p>
        </section>

        <section className="rounded-3xl bg-stone-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold">
            Does a teaching salary clear the bar for affordable housing?
          </h2>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            NYC Housing Connect lotteries set income eligibility as a percentage of
            Area Median Income (AMI), and the ceilings for a single applicant in 2026
            run roughly $29,100 at 30% AMI, $48,500 at 50% AMI, $77,600 at 80% AMI, and
            $116,400 at 120% AMI. A single teacher&rsquo;s {wholeMoney.format(baSalary)}{" "}
            starting salary sits above the 30% and 50% AMI ceilings but below the 80%
            and 120% AMI ceilings—so the deepest-affordability lotteries (which
            usually carry the lowest rents) are generally out of reach on income
            grounds, while low- and moderate-income lotteries generally remain open.
          </p>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            This is illustrative math, not a guarantee: individual listings often set
            a minimum as well as a maximum income based on the unit&rsquo;s rent, and
            household size changes every ceiling. See the{" "}
            <Link
              href="/nyc-affordable-housing-guide/"
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              affordable housing guide
            </Link>{" "}
            for the full income table and how to apply.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            Gross salary sets eligibility. Net pay sets the actual budget.
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            A common budgeting guideline caps rent at roughly 30% of gross income.
            For the {wholeMoney.format(baSalary)} starting salary, that guideline
            suggests a target monthly rent near {money.format(suggestedRentAt30Percent)}
            . But that guideline is measured against gross pay, while the money
            actually available to pay it comes from net, after-tax pay—about{" "}
            {money.format(baResult.monthlyNet)} a month in this example. The gap
            between those two numbers is exactly why a paycheck calculator estimate,
            not just a published salary figure, is the more honest starting point for
            a real budget.
          </p>
          <CalculatorAction className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950">
            Run your own salary through the calculator
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
                href="https://www.uft.org/your-rights/salary/doe-and-city-salary-schedules/teacher-salary-schedule"
                target="_blank"
                rel="noreferrer"
              >
                UFT: Teacher salary schedule (2022&ndash;27)
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-emerald-800 hover:text-emerald-950"
                href="https://housingconnect.nyc.gov"
                target="_blank"
                rel="noreferrer"
              >
                NYC Housing Connect
              </a>
            </li>
          </ul>
        </section>
      </BlogLayout>
    </>
  );
}
