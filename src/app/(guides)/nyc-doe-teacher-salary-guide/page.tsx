import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { calculatePaycheck } from "@/features/calculator/tax";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { GuidePage } from "@/shared/components/GuidePage";
import { createArticleJsonLd, createPageMetadata } from "@/shared/lib/seo";

const path = "/nyc-doe-teacher-salary-guide/";
const title = "NYC DOE Teacher Salary 2026 | UFT Pay Scale & Take-Home Pay";
const description =
  "Current NYC Department of Education starting teacher salaries under the UFT contract, how the step-and-differential pay scale works, and what it means for take-home pay.";

export const metadata: Metadata = createPageMetadata({ title, description, path });

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

const startingSalaries = [
  { credential: "Bachelor's degree, no prior teaching experience", salary: 68_902 },
  { credential: "Master's degree, no prior teaching experience", salary: 77_455 },
];

const contractIncreases = [
  { effective: "September 14, 2022", increase: "3%" },
  { effective: "January 18, 2024", increase: "3%" },
  { effective: "January 18, 2025", increase: "3%" },
  { effective: "September 14, 2025", increase: "3.25%" },
  { effective: "September 14, 2026", increase: "3.5%" },
];

const salaryResults = startingSalaries.map((row) => ({
  ...row,
  result: calculatePaycheck({
    annualSalary: row.salary,
    payPeriods: 26,
    filingStatus: "single",
    pretaxPerPaycheck: 0,
  }),
}));

export default function DoeTeacherSalaryGuide() {
  const structuredData = createArticleJsonLd({ title, description, path });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GuidePage
        currentPath={path}
        eyebrow="Teacher salary guide"
        title="What NYC DOE teachers actually earn"
        description="NYC public school teachers are paid on a single UFT-negotiated salary schedule based on step (years of service) and differential (education credentials)—not on individual school budgets or negotiation."
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            2026 starting salary for a new NYC DOE teacher
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            As of September 14, 2025, a new teacher with no prior teaching experience
            starts on the DOE salary schedule at the following base salaries,
            depending on educational credential:
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full min-w-xl border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100 text-xs text-stone-600">
                  <th scope="col" className="px-5 py-4 font-semibold">Credential</th>
                  <th scope="col" className="px-5 py-4 font-semibold">2025–26 starting salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {startingSalaries.map((row) => (
                  <tr key={row.credential} className="hover:bg-stone-50">
                    <td className="px-5 py-4 text-sm text-stone-600">{row.credential}</td>
                    <td className="px-5 py-4 text-sm font-semibold tabular-nums text-emerald-800">
                      {wholeMoney.format(row.salary)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-stone-950">
            How the step-and-differential pay scale works
          </h2>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            Every UFT-represented teacher, from a first-year hire to a 30-year
            veteran, is placed on the same negotiated salary schedule using two
            variables: <strong>step</strong>, which advances with each year of
            teaching service, and <strong>differential</strong>, which reflects
            education beyond a bachelor&rsquo;s degree—additional graduate credits, a
            master&rsquo;s degree, or a doctorate. Salary also increases at set
            longevity milestones later in a career. Because the schedule is
            contractual, two teachers at the same school with the same step and
            differential earn the same base salary.
          </p>
          <p className="mt-4 max-w-3xl text-pretty leading-7 text-stone-600">
            The full schedule is renegotiated periodically between the DOE and the
            UFT. The current agreement (2022–27) applies these across-the-board
            increases to every step:
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {contractIncreases.map((row) => (
              <div
                key={row.effective}
                className="flex items-center justify-between rounded-2xl bg-stone-100 px-5 py-4 text-sm"
              >
                <span className="font-medium text-stone-700">{row.effective}</span>
                <span className="font-semibold tabular-nums text-emerald-800">+{row.increase}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-stone-950 p-7 text-white sm:p-9">
          <h2 className="text-2xl font-semibold">What a DOE starting salary looks like after tax</h2>
          <p className="mt-4 text-pretty leading-7 text-stone-300">
            Running both 2025–26 starting salaries through the paycheck calculator, as
            a single filer paid bi-weekly with no pre-tax deductions:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {salaryResults.map((row) => (
              <div key={row.credential} className="rounded-2xl border border-stone-800 p-5">
                <p className="text-xs text-stone-400">{row.credential.split(",")[0]}</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums">
                  {money.format(row.result.perPaycheck.net)}
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  net per check &middot; {wholeMoney.format(row.result.annual.net)} annually
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-pretty text-sm leading-6 text-stone-400">
            DOE teachers also make a mandatory contribution to the NYC Teachers&rsquo;
            Retirement System (TRS) pension, which is deducted before income tax the
            same way a traditional pre-tax deduction is. Enter your TRS contribution
            per paycheck in the calculator&rsquo;s pre-tax field for a closer estimate—
            Social Security and Medicare still apply to your full gross salary either
            way.
          </p>
          <p className="mt-4 text-pretty text-sm leading-6 text-stone-400">
            Curious whether that salary clears the bar for the city&rsquo;s own
            affordable housing lotteries? Read{" "}
            <Link
              href="/blog/nyc-teacher-salary-affordable-housing/"
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Can an NYC teacher afford NYC?
            </Link>{" "}
            on the blog.
          </p>
          <CalculatorAction className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
            Calculate your own step and salary
            <ArrowRight className="size-4" aria-hidden="true" />
          </CalculatorAction>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <h2 className="text-2xl font-semibold text-stone-950">Official sources</h2>
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
                href="https://www.uft.org/news/you-should-know/know-your-rights/salary-steps-and-longevity"
                target="_blank"
                rel="noreferrer"
              >
                UFT: Salary, steps, and longevity
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-emerald-800 hover:text-emerald-950"
                href="https://teachnyc.net/why-teach-nycps/salary-benefits"
                target="_blank"
                rel="noreferrer"
              >
                TeachNYC: Salary and benefits
              </a>
            </li>
          </ul>
        </section>
      </GuidePage>
    </>
  );
}
