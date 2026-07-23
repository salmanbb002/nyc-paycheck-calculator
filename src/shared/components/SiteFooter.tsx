import Link from "next/link";
import { BrandLogo } from "@/shared/components/BrandLogo";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { primaryNavigation } from "@/shared/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <div>
            <Link href="/" aria-label="NYC Paycheck Calculator home">
              <BrandLogo className="mb-3" />
            </Link>
            <p className="max-w-md text-pretty text-xs leading-5 text-stone-500">
              Educational estimates only. This site does not provide tax, legal, or
              financial advice. Consult a qualified professional for personal guidance.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-start gap-x-6 gap-y-3 text-sm text-stone-600"
          >
            {primaryNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-stone-950">
                {item.label}
              </Link>
            ))}
            <Link href="/blog/" className="hover:text-stone-950">
              Blog
            </Link>
            <CalculatorAction className="cursor-pointer bg-transparent p-0 text-sm text-stone-600 hover:text-stone-950">
              Calculator
            </CalculatorAction>
          </nav>
        </div>
        <div className="mt-8 border-t border-stone-200 pt-6 text-xs text-stone-500">
          © 2026 NYC Paycheck Calculator · Built for New Yorkers.
        </div>
      </div>
    </footer>
  );
}
