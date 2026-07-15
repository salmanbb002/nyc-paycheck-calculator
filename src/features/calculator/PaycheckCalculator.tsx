"use client";

import {
  Check,
  ChevronDown,
  Clipboard,
  Info,
  Landmark,
  Share2,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { calculatePaycheck, type FilingStatus } from "./tax";

const FREQUENCIES = [
  { value: 52, label: "Weekly", detail: "52 checks / year" },
  { value: 26, label: "Bi-weekly", detail: "26 checks / year" },
  { value: 24, label: "Semi-monthly", detail: "24 checks / year" },
  { value: 12, label: "Monthly", detail: "12 checks / year" },
];

const QUICK_SALARIES = [60_000, 85_000, 100_000, 150_000];

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

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function PaycheckCalculator() {
  const [salary, setSalary] = useState("85000");
  const [payPeriods, setPayPeriods] = useState(26);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [pretax, setPretax] = useState("0");
  const [actionMessage, setActionMessage] = useState("");

  const annualSalary = Number(salary) || 0;
  const pretaxPerPaycheck = Number(pretax) || 0;
  const grossPerPaycheck = annualSalary / payPeriods;
  const salaryError = annualSalary > 10_000_000
    ? "Enter a salary of $10 million or less."
    : annualSalary < 0
      ? "Salary cannot be negative."
      : "";
  const pretaxError = pretaxPerPaycheck > grossPerPaycheck && annualSalary > 0
    ? `Keep deductions below your ${wholeMoney.format(grossPerPaycheck)} gross check.`
    : pretaxPerPaycheck < 0
      ? "Deductions cannot be negative."
      : "";

  const result = useMemo(
    () =>
      calculatePaycheck({
        annualSalary: salaryError ? 0 : annualSalary,
        payPeriods,
        filingStatus,
        pretaxPerPaycheck,
      }),
    [annualSalary, filingStatus, payPeriods, pretaxPerPaycheck, salaryError],
  );

  const selectedFrequency = FREQUENCIES.find(
    (frequency) => frequency.value === payPeriods,
  );

  const breakdown = [
    { label: "Gross pay", value: result.perPaycheck.gross, deduction: false },
    { label: "Pre-tax contribution", value: result.perPaycheck.pretax, deduction: true },
    { label: "Federal income tax", value: result.perPaycheck.federal, deduction: true },
    { label: "New York State", value: result.perPaycheck.state, deduction: true },
    { label: "New York City", value: result.perPaycheck.city, deduction: true },
    { label: "FICA", value: result.perPaycheck.fica, deduction: true },
  ];

  const gross = Math.max(result.annual.gross, 1);
  const barSegments = [
    {
      label: "Take-home",
      value: result.annual.net,
      color: "bg-emerald-400",
    },
    {
      label: "Federal",
      value: result.annual.federal,
      color: "bg-stone-300",
    },
    {
      label: "NY State",
      value: result.annual.state,
      color: "bg-stone-400",
    },
    {
      label: "NYC",
      value: result.annual.city,
      color: "bg-stone-500",
    },
    {
      label: "FICA",
      value: result.annual.fica,
      color: "bg-stone-600",
    },
    {
      label: "Pre-tax",
      value: result.annual.pretax,
      color: "bg-stone-700",
    },
  ];

  const estimateText = [
    "2026 NYC paycheck estimate",
    `Annual salary: ${money.format(result.annual.gross)}`,
    `Net per ${selectedFrequency?.label.toLowerCase()} check: ${money.format(result.perPaycheck.net)}`,
    `Monthly take-home: ${money.format(result.monthlyNet)}`,
    `Annual take-home: ${money.format(result.annual.net)}`,
    `Effective tax rate: ${formatPercent(result.effectiveTaxRate)}`,
  ].join("\n");

  async function copyEstimate(message = "Estimate copied") {
    try {
      await navigator.clipboard.writeText(estimateText);
      setActionMessage(message);
      window.setTimeout(() => setActionMessage(""), 2200);
    } catch {
      setActionMessage("Copy is unavailable in this browser");
    }
  }

  async function shareEstimate() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My NYC paycheck estimate",
          text: estimateText,
          url: window.location.href,
        });
        setActionMessage("Share sheet opened");
      } catch {
        return;
      }
    } else {
      await copyEstimate("Estimate copied for sharing");
    }
  }

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="scroll-mt-24"
    >
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8 lg:col-span-5">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-emerald-700">Your details</p>
              <h2
                id="calculator-heading"
                className="text-balance text-2xl font-semibold text-stone-950"
              >
                Build your paycheck
              </h2>
            </div>
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <WalletCards className="size-5" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-7">
            <div>
              <label
                htmlFor="annual-salary"
                className="mb-2 block text-sm font-medium text-stone-800"
              >
                Annual gross salary
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-lg text-stone-400">
                  $
                </span>
                <input
                  id="annual-salary"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="10000000"
                  step="1000"
                  value={salary}
                  onChange={(event) => setSalary(event.target.value)}
                  aria-invalid={Boolean(salaryError)}
                  aria-describedby={salaryError ? "salary-error" : "salary-help"}
                  className="h-14 w-full rounded-xl border border-stone-300 bg-white pl-9 pr-4 text-lg font-semibold tabular-nums text-stone-950 shadow-sm outline-none placeholder:font-normal placeholder:text-stone-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                  placeholder="85,000"
                />
              </div>
              {salaryError ? (
                <p id="salary-error" className="mt-2 text-sm text-red-700">
                  {salaryError}
                </p>
              ) : (
                <p id="salary-help" className="mt-2 text-xs text-stone-500">
                  Before taxes and payroll deductions.
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2" aria-label="Quick salary choices">
                {QUICK_SALARIES.map((quickSalary) => (
                  <button
                    key={quickSalary}
                    type="button"
                    onClick={() => setSalary(String(quickSalary))}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                      annualSalary === quickSalary
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:text-stone-950",
                    )}
                  >
                    {wholeMoney.format(quickSalary)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="pay-frequency"
                className="mb-2 block text-sm font-medium text-stone-800"
              >
                Pay frequency
              </label>
              <div className="relative">
                <select
                  id="pay-frequency"
                  value={payPeriods}
                  onChange={(event) => setPayPeriods(Number(event.target.value))}
                  className="h-12 w-full appearance-none rounded-xl border border-stone-300 bg-white px-4 pr-10 text-sm font-medium text-stone-950 shadow-sm outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  {FREQUENCIES.map((frequency) => (
                    <option key={frequency.value} value={frequency.value}>
                      {frequency.label} · {frequency.detail}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-stone-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-stone-800">
                Federal filing status
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {([
                  ["single", "Single"],
                  ["married", "Married jointly"],
                ] as const).map(([value, label]) => (
                  <label
                    key={value}
                    className={cn(
                      "flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-sm font-medium transition-colors duration-150",
                      filingStatus === value
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                        : "border-stone-300 bg-white text-stone-600 hover:border-stone-400",
                    )}
                  >
                    <input
                      type="radio"
                      name="filing-status"
                      value={value}
                      checked={filingStatus === value}
                      onChange={() => setFilingStatus(value)}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label
                  htmlFor="pretax-deductions"
                  className="text-sm font-medium text-stone-800"
                >
                  Pre-tax deductions
                </label>
                <span className="text-xs text-stone-500">per paycheck</span>
              </div>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-400">
                  $
                </span>
                <input
                  id="pretax-deductions"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="10"
                  value={pretax}
                  onChange={(event) => setPretax(event.target.value)}
                  aria-invalid={Boolean(pretaxError)}
                  aria-describedby={pretaxError ? "pretax-error" : "pretax-help"}
                  className="h-12 w-full rounded-xl border border-stone-300 bg-white pl-9 pr-4 text-sm font-medium tabular-nums text-stone-950 shadow-sm outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
              {pretaxError ? (
                <p id="pretax-error" className="mt-2 text-sm text-red-700">
                  {pretaxError}
                </p>
              ) : (
                <p id="pretax-help" className="mt-2 text-xs leading-5 text-stone-500">
                  Example: traditional 401(k), HSA, or eligible transit benefits.
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-stone-100 p-4 text-xs leading-5 text-stone-600">
            <Info className="mt-0.5 size-4 shrink-0 text-stone-500" aria-hidden="true" />
            <p className="text-pretty">
              Assumes a W-2 employee, full-year NYC residency, standard deductions,
              and no dependents or special credits.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-stone-950 p-5 text-white shadow-xl sm:p-8 lg:sticky lg:top-24">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-medium text-stone-400">
                  Your estimated {selectedFrequency?.label.toLowerCase()} paycheck
                </p>
                <p className="text-4xl font-semibold tabular-nums text-emerald-400 sm:text-5xl">
                  {money.format(result.perPaycheck.net)}
                </p>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-stone-800 text-emerald-400">
                <Landmark className="size-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mb-8 grid gap-px overflow-hidden rounded-2xl bg-stone-800 sm:grid-cols-3">
              {[
                ["Monthly take-home", money.format(result.monthlyNet)],
                ["Annual take-home", wholeMoney.format(result.annual.net)],
                ["Effective tax rate", formatPercent(result.effectiveTaxRate)],
              ].map(([label, value]) => (
                <div key={label} className="bg-stone-900 p-4">
                  <p className="mb-1 text-xs text-stone-400">{label}</p>
                  <p className="text-base font-semibold tabular-nums text-stone-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-stone-100">Paycheck breakdown</h3>
                <span className="rounded-full border border-stone-700 px-2.5 py-1 text-xs text-stone-400">
                  {payPeriods}× / year
                </span>
              </div>
              <dl className="divide-y divide-stone-800 border-y border-stone-800">
                {breakdown.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-stone-400">{item.label}</dt>
                    <dd
                      className={cn(
                        "text-sm font-medium tabular-nums",
                        item.deduction ? "text-stone-300" : "text-white",
                      )}
                    >
                      {item.deduction && item.value > 0 ? "−" : ""}
                      {money.format(item.value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-stone-100">Where your salary goes</p>
                <p className="text-xs tabular-nums text-stone-400">
                  {formatPercent(result.takeHomeRate)} kept
                </p>
              </div>
              <div
                className="flex h-3 overflow-hidden rounded-full bg-stone-800"
                role="img"
                aria-label={`${formatPercent(result.takeHomeRate)} of gross salary is estimated take-home pay`}
              >
                {barSegments.map((segment) => (
                  <div
                    key={segment.label}
                    className={segment.color}
                    style={{ width: `${Math.max(0, (segment.value / gross) * 100)}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {barSegments.map((segment) => (
                  <div key={segment.label} className="flex items-center gap-1.5 text-xs text-stone-400">
                    <span className={cn("size-2 rounded-full", segment.color)} />
                    {segment.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => copyEstimate()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 text-sm font-semibold text-stone-950 transition-colors duration-150 hover:bg-emerald-300"
              >
                {actionMessage.startsWith("Estimate copied") ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Clipboard className="size-4" aria-hidden="true" />
                )}
                Copy estimate
              </button>
              <button
                type="button"
                onClick={shareEstimate}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-stone-800"
              >
                <Share2 className="size-4" aria-hidden="true" />
                Share
              </button>
            </div>
            <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-stone-400">
              {actionMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
