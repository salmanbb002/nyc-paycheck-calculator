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

const post = getBlogPost("ny-minimum-wage-2026-increase")!;
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

const FULL_TIME_ANNUAL_HOURS = 2_080;

const nycResult = calculatePaycheck({
  annualSalary: 17 * FULL_TIME_ANNUAL_HOURS,
  payPeriods: 26,
  filingStatus: "single",
  pretaxPerPaycheck: 0,
});

const faq = [
  {
    question: "What is the current minimum wage in New York?",
    answer:
      "Since January 1, 2026, it's $17 an hour in New York City, Long Island (Nassau and Suffolk counties), and Westchester County, and $16 an hour in the rest of New York State.",
  },
  {
    question: "What's the New York minimum wage in annual salary terms?",
    answer:
      "A full-time schedule of 2,080 hours a year (40 hours a week, 52 weeks) at $17/hour comes to $35,360 before tax in New York City, Long Island, and Westchester. At $16/hour elsewhere in the state, full-time comes to $33,280 before tax.",
  },
  {
    question: "Does the minimum wage go up every year now?",
    answer:
      "It has gone up on a fixed legislative schedule since 2016, with 2026 as the final scheduled step. Starting in 2027, increases become automatic, tied to the Consumer Price Index for Urban Wage Earners and Clerical Workers (CPI-W) for the Northeast region, rather than a rate set directly by lawmakers.",
  },
  {
    question: "Is there a different minimum wage for tipped workers in New York?",
    answer:
      "Yes, for certain tipped occupations in the hospitality industry New York permits a lower cash wage as long as tips bring total pay up to at least the standard minimum wage—if they don't, the employer must make up the difference. Most other industries must pay the full minimum wage in cash regardless of tips.",
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

export default function MinimumWageBlogPost() {
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
          { label: "New York minimum wage guide", href: "/nyc-minimum-wage-guide/" },
          { label: "NYC salary guide", href: "/nyc-salary-guide/" },
        ]}
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            What changed on January 1, 2026
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            New York's minimum wage rose again at the start of the year, continuing a
            schedule Governor Hochul and the state legislature set in 2023. The
            increase applies in two tiers, based on where the work is performed, not
            where the employer is based or where the worker lives.
          </p>

          <div className="mt-8">
            <ComparisonBarList
              title="New York minimum wage by region, 2026"
              rows={[
                { label: "New York City", value: 17, displayValue: "$17.00/hr", helper: "Long Island and Westchester too" },
                { label: "Rest of New York State", value: 16, displayValue: "$16.00/hr" },
              ]}
              caption="Effective January 1, 2026. Both tiers rose $0.50 from 2025 levels. Source: New York State, 'Raising the Minimum Wage.'"
            />
          </div>
        </section>

        <section className="rounded-3xl bg-stone-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold">Why a two-tier minimum wage?</h2>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            New York City, Long Island, and Westchester County share a higher rate
            because the state legislature recognized that housing and living costs in
            the downstate region run well above the rest of the state. The two-tier
            structure has been in place since New York began phasing in $15 minimum
            wages in the mid-2010s, and the 2023 law that set the current increases
            preserved that same regional split rather than moving to one statewide
            number.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            2026 is the last increase lawmakers set directly
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            Under the 2023 law, every increase through January 2026 was a specific,
            pre-set dollar amount written into the statute. That ends this year.
            Starting January 1, 2027, New York's minimum wage will adjust
            automatically and annually based on the{" "}
            <strong>Consumer Price Index for Urban Wage Earners and Clerical
            Workers (CPI-W)</strong> for the Northeast region—the same type of
            inflation measure used to index Social Security benefits. In practice,
            that means future increases will track inflation directly rather than
            requiring new legislation each time, though the law includes guardrails
            so the wage cannot be indexed downward if inflation is negative.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            What a full-time minimum-wage paycheck looks like after tax
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            A full-time, 40-hour-a-week New York City minimum-wage job pays{" "}
            {wholeMoney.format(17 * FULL_TIME_ANNUAL_HOURS)} a year before tax.
            Running that through the paycheck calculator as a single filer paid
            bi-weekly gives an estimated {money.format(nycResult.perPaycheck.net)} net
            per check, or about {wholeMoney.format(nycResult.annual.net)} a year—an
            effective tax rate near {nycResult.effectiveTaxRate.toFixed(1)}%. That
            estimate is conservative at this income level: it doesn&rsquo;t account
            for the Earned Income Tax Credit or New York's own EITC, which typically
            raise a low-wage worker's effective take-home pay and refund well above
            what a simple withholding estimate shows. See the full breakdown, region
            by region, in the{" "}
            <Link
              href="/nyc-minimum-wage-guide/"
              className="font-semibold text-emerald-800 hover:text-emerald-950"
            >
              New York minimum wage guide
            </Link>
            .
          </p>
          <CalculatorAction className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950">
            Estimate take-home pay at any wage
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
      </BlogLayout>
    </>
  );
}
