"use client";

import { useEffect } from "react";

const legacyRoutes: Record<string, string> = {
  taxes: "/nyc-income-tax-guide/",
  salaries: "/nyc-salary-guide/",
  methodology: "/paycheck-calculator-methodology/",
  faq: "/nyc-paycheck-calculator-faq/",
};

export function LegacyHashRouter() {
  useEffect(() => {
    const hash = window.location.hash.slice(1).toLowerCase();

    if (legacyRoutes[hash]) {
      window.location.replace(legacyRoutes[hash]);
      return;
    }

    const calculatorRequested =
      hash === "calculator" ||
      window.sessionStorage.getItem("open-nyc-calculator") === "true";

    if (calculatorRequested) {
      window.sessionStorage.removeItem("open-nyc-calculator");
      document.getElementById("calculator")?.scrollIntoView({ block: "start" });
    }

    if (hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return null;
}
