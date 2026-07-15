import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateBracketTax, calculatePaycheck } from "./tax.ts";

describe("calculateBracketTax", () => {
  it("applies progressive brackets", () => {
    assert.equal(
      calculateBracketTax(20_000, [
        { rate: 0.1, max: 10_000 },
        { rate: 0.2, max: Number.POSITIVE_INFINITY },
      ]),
      3_000,
    );
  });
});

describe("calculatePaycheck", () => {
  it("uses official 2026 Social Security cap", () => {
    const result = calculatePaycheck({
      annualSalary: 200_000,
      payPeriods: 26,
      filingStatus: "single",
      pretaxPerPaycheck: 0,
    });

    assert.ok(Math.abs(result.annual.socialSecurity - 11_439) < 0.01);
  });

  it("subtracts pre-tax contributions from take-home pay", () => {
    const withoutPretax = calculatePaycheck({
      annualSalary: 100_000,
      payPeriods: 26,
      filingStatus: "single",
      pretaxPerPaycheck: 0,
    });
    const withPretax = calculatePaycheck({
      annualSalary: 100_000,
      payPeriods: 26,
      filingStatus: "single",
      pretaxPerPaycheck: 200,
    });

    assert.ok(withPretax.annual.net < withoutPretax.annual.net);
    assert.ok(withPretax.annual.totalTax < withoutPretax.annual.totalTax);
    assert.equal(withPretax.annual.pretax, 5_200);
  });

  it("applies additional Medicare tax above the filing threshold", () => {
    const result = calculatePaycheck({
      annualSalary: 300_000,
      payPeriods: 12,
      filingStatus: "single",
      pretaxPerPaycheck: 0,
    });

    assert.ok(Math.abs(result.annual.additionalMedicare - 900) < 0.01);
  });

  it("never allows deductions to exceed gross pay", () => {
    const result = calculatePaycheck({
      annualSalary: 52_000,
      payPeriods: 52,
      filingStatus: "single",
      pretaxPerPaycheck: 2_000,
    });

    assert.equal(result.perPaycheck.pretax, 1_000);
    assert.equal(result.annual.net, 0);
  });
});
