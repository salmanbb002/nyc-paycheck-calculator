"use client";

import type { ReactNode } from "react";

type CalculatorActionProps = {
  children: ReactNode;
  className: string;
};

export function CalculatorAction({ children, className }: CalculatorActionProps) {
  function openCalculator() {
    const calculator = document.getElementById("calculator");

    if (calculator) {
      calculator.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    window.sessionStorage.setItem("open-nyc-calculator", "true");
    window.location.assign("/");
  }

  return (
    <button type="button" onClick={openCalculator} className={className}>
      {children}
    </button>
  );
}
