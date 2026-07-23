import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { GuidePage } from "@/shared/components/GuidePage";
import { createArticleJsonLd, createPageMetadata } from "@/shared/lib/seo";

const path = "/nyc-affordable-housing-guide/";
const title = "NYC Affordable Housing Income Limits 2026 | Do You Qualify?";
const description =
  "How NYC affordable housing income limits work, current 2026 AMI bands for a single applicant, and why your gross salary and your take-home pay answer two different questions.";

export const metadata: Metadata = createPageMetadata({ title, description, path });

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const singleApplicantBands = [
  { tier: "30% AMI", label: "Extremely low income", max: 29_100 },
  { tier: "50% AMI", label: "Very low income", max: 48_500 },
  { tier: "80% AMI", label: "Low income", max: 77_600 },
  { tier: "120% AMI", label: "Moderate / middle income", max: 116_400 },
];

const areaMedianIncome = [
  { size: "3-person household", income: 152_700 },
  { size: "4-person household", income: 169_600 },
];

export default function AffordableHousingGuide() {
  const structuredData = createArticleJsonLd({ title, description, path });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GuidePage
        currentPath={path}
        eyebrow="Affordable housing guide"
        title="Does your income qualify for NYC affordable housing?"
        description="NYC affordable housing eligibility runs on Area Median Income (AMI) bands set each year by HUD, not a single citywide income cutoff. Here's how the bands work in 2026, and how to read them against your own paycheck."
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            How affordable housing income limits actually work
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            Every affordable unit listed through NYC Housing Connect is tied to a
            percentage of the Area Median Income (AMI) for the New York City metro
            area, recalculated annually by the U.S. Department of Housing and Urban
            Development. A studio might be reserved for applicants at 50% AMI, while a
            two-bedroom in the same lottery is reserved for 90% AMI—so &ldquo;low
            income&rdquo; and &ldquo;affordable&rdquo; cover a much wider income range
            than most renters expect.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full min-w-xl border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100 text-xs text-stone-600">
                  <th scope="col" className="px-5 py-4 font-semibold">AMI band</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Income category</th>
                  <th scope="col" className="px-5 py-4 font-semibold">2026 max, single applicant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {singleApplicantBands.map((band) => (
                  <tr key={band.tier} className="hover:bg-stone-50">
                    <td className="px-5 py-4 text-sm font-semibold text-stone-950">{band.tier}</td>
                    <td className="px-5 py-4 text-sm text-stone-600">{band.label}</td>
                    <td className="px-5 py-4 text-sm font-semibold tabular-nums text-emerald-800">
                      up to {money.format(band.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-pretty text-sm leading-6 text-stone-500">
            Limits rise with household size. For 2026, 100% AMI for the NYC metro area
            is {money.format(areaMedianIncome[0].income)} for a{" "}
            {areaMedianIncome[0].size.replace("household", "")} and{" "}
            {money.format(areaMedianIncome[1].income)} for a{" "}
            {areaMedianIncome[1].size.replace("household", "")}. Every listing on NYC
            Housing Connect states the exact income range for its household size before
            you apply.
          </p>
        </section>

        <section className="rounded-3xl bg-stone-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold">
            Gross income decides eligibility. Take-home pay decides what you can afford.
          </h2>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            NYC Housing Connect income limits are measured against gross household
            income—the same salary figure on your offer letter, before federal, state,
            city, and FICA taxes. That number determines which lotteries you can enter.
            It doesn&rsquo;t tell you whether a given unit&rsquo;s rent actually fits
            your budget, because rent has to be paid out of what lands in your account
            after taxes.
          </p>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            Run your salary through the paycheck calculator to see your net monthly
            take-home pay, then compare that figure to a listing&rsquo;s monthly rent—not
            the gross income figure that got you into the lottery in the first place.
          </p>
          <p className="mt-4 text-pretty text-sm leading-6 text-stone-400">
            See this math worked through for a real NYC salary in{" "}
            <Link
              href="/blog/nyc-teacher-salary-affordable-housing/"
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Can an NYC teacher afford NYC?
            </Link>{" "}
            on the blog.
          </p>
          <CalculatorAction className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
            Check your net monthly take-home pay
            <ArrowRight className="size-4" aria-hidden="true" />
          </CalculatorAction>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            How to apply for affordable housing in NYC
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            All city-affiliated affordable housing—new construction and many
            re-listed units, across Manhattan, Brooklyn, Queens, the Bronx, and Staten
            Island—is listed through NYC Housing Connect, the city&rsquo;s Department of
            Housing Preservation and Development (HPD) portal. Applying is free and
            takes place through the same account for every lottery:
          </p>
          <ol className="mt-6 space-y-3 text-sm leading-6 text-stone-600">
            <li>1. Create a Housing Connect profile with your household size and gross annual income.</li>
            <li>2. Browse open lotteries and check each listing&rsquo;s specific AMI band and household-size requirements.</li>
            <li>3. Apply to any lottery where your income falls inside the listed range—applying to more than one does not hurt your odds elsewhere.</li>
            <li>4. If selected, submit documentation: pay stubs, tax returns, and asset statements to verify the income you applied with.</li>
          </ol>
          <p className="mt-4 text-pretty leading-7 text-stone-600">
            Selection is by lottery, not first-come-first-served, so a single
            application isn&rsquo;t a strong signal either way. Most successful
            applicants apply to many listings over an extended period.
          </p>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <h2 className="text-2xl font-semibold text-stone-950">Official sources</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6">
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
            <li>
              <a
                className="font-semibold text-emerald-800 hover:text-emerald-950"
                href="https://www.nyc.gov/site/hpd/index.page"
                target="_blank"
                rel="noreferrer"
              >
                NYC Department of Housing Preservation and Development
              </a>
            </li>
          </ul>
        </section>
      </GuidePage>
    </>
  );
}
