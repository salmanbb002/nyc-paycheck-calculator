import Link from "next/link";
import { BrandLogo } from "@/shared/components/BrandLogo";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { primaryNavigation } from "@/shared/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="NYC Paycheck Calculator home">
          <BrandLogo compact />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              className="text-sm text-stone-600 hover:text-stone-950"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <CalculatorAction className="inline-flex min-h-10 items-center justify-center rounded-xl bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-stone-800">
          Calculate
        </CalculatorAction>
      </div>
    </header>
  );
}
