export type FilingStatus = "single" | "married";

export type PaycheckInput = {
  annualSalary: number;
  payPeriods: number;
  filingStatus: FilingStatus;
  pretaxPerPaycheck: number;
};

type TaxBracket = {
  rate: number;
  max: number;
};

const FEDERAL_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.1, max: 12_400 },
    { rate: 0.12, max: 50_400 },
    { rate: 0.22, max: 105_700 },
    { rate: 0.24, max: 201_775 },
    { rate: 0.32, max: 256_225 },
    { rate: 0.35, max: 640_600 },
    { rate: 0.37, max: Number.POSITIVE_INFINITY },
  ],
  married: [
    { rate: 0.1, max: 24_800 },
    { rate: 0.12, max: 100_800 },
    { rate: 0.22, max: 211_400 },
    { rate: 0.24, max: 403_550 },
    { rate: 0.32, max: 512_450 },
    { rate: 0.35, max: 768_700 },
    { rate: 0.37, max: Number.POSITIVE_INFINITY },
  ],
};

const NY_STATE_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.039, max: 8_500 },
    { rate: 0.044, max: 11_700 },
    { rate: 0.0515, max: 13_900 },
    { rate: 0.054, max: 80_650 },
    { rate: 0.059, max: 215_400 },
    { rate: 0.0685, max: 1_077_550 },
    { rate: 0.0965, max: 5_000_000 },
    { rate: 0.103, max: 25_000_000 },
    { rate: 0.109, max: Number.POSITIVE_INFINITY },
  ],
  married: [
    { rate: 0.039, max: 17_150 },
    { rate: 0.044, max: 23_600 },
    { rate: 0.0515, max: 27_900 },
    { rate: 0.054, max: 161_550 },
    { rate: 0.059, max: 323_200 },
    { rate: 0.0685, max: 2_155_350 },
    { rate: 0.0965, max: 5_000_000 },
    { rate: 0.103, max: 25_000_000 },
    { rate: 0.109, max: Number.POSITIVE_INFINITY },
  ],
};

const NYC_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.03078, max: 12_000 },
    { rate: 0.03762, max: 25_000 },
    { rate: 0.03819, max: 50_000 },
    { rate: 0.03876, max: Number.POSITIVE_INFINITY },
  ],
  married: [
    { rate: 0.03078, max: 21_600 },
    { rate: 0.03762, max: 45_000 },
    { rate: 0.03819, max: 90_000 },
    { rate: 0.03876, max: Number.POSITIVE_INFINITY },
  ],
};

const FEDERAL_STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16_100,
  married: 32_200,
};

const NY_STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 8_000,
  married: 16_050,
};

const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_WAGE_BASE = 184_500;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200_000,
  married: 250_000,
};

export function calculateBracketTax(income: number, brackets: TaxBracket[]) {
  let tax = 0;
  let previousMax = 0;

  for (const bracket of brackets) {
    if (income <= previousMax) break;
    const taxableInBracket = Math.min(income, bracket.max) - previousMax;
    tax += taxableInBracket * bracket.rate;
    previousMax = bracket.max;
  }

  return Math.max(0, tax);
}

export function calculatePaycheck(input: PaycheckInput) {
  const annualSalary = Math.max(0, input.annualSalary);
  const payPeriods = Math.max(1, input.payPeriods);
  const grossPerPaycheck = annualSalary / payPeriods;
  const pretaxPerPaycheck = Math.min(
    Math.max(0, input.pretaxPerPaycheck),
    grossPerPaycheck,
  );
  const annualPretax = pretaxPerPaycheck * payPeriods;
  const incomeAfterPretax = Math.max(0, annualSalary - annualPretax);

  const federalTaxableIncome = Math.max(
    0,
    incomeAfterPretax - FEDERAL_STANDARD_DEDUCTION[input.filingStatus],
  );
  const nyTaxableIncome = Math.max(
    0,
    incomeAfterPretax - NY_STANDARD_DEDUCTION[input.filingStatus],
  );

  const federal = calculateBracketTax(
    federalTaxableIncome,
    FEDERAL_BRACKETS[input.filingStatus],
  );
  const state = calculateBracketTax(
    nyTaxableIncome,
    NY_STATE_BRACKETS[input.filingStatus],
  );
  const city = calculateBracketTax(
    nyTaxableIncome,
    NYC_BRACKETS[input.filingStatus],
  );

  const socialSecurity =
    Math.min(annualSalary, SOCIAL_SECURITY_WAGE_BASE) * SOCIAL_SECURITY_RATE;
  const medicare = annualSalary * MEDICARE_RATE;
  const additionalMedicare =
    Math.max(
      0,
      annualSalary - ADDITIONAL_MEDICARE_THRESHOLD[input.filingStatus],
    ) * ADDITIONAL_MEDICARE_RATE;
  const fica = socialSecurity + medicare + additionalMedicare;
  const totalTax = federal + state + city + fica;
  const net = Math.max(0, annualSalary - annualPretax - totalTax);

  const perPaycheck = {
    gross: grossPerPaycheck,
    pretax: pretaxPerPaycheck,
    federal: federal / payPeriods,
    state: state / payPeriods,
    city: city / payPeriods,
    fica: fica / payPeriods,
    net: net / payPeriods,
  };

  return {
    annual: {
      gross: annualSalary,
      pretax: annualPretax,
      federal,
      state,
      city,
      fica,
      socialSecurity,
      medicare,
      additionalMedicare,
      totalTax,
      net,
    },
    perPaycheck,
    monthlyNet: net / 12,
    effectiveTaxRate: annualSalary > 0 ? (totalTax / annualSalary) * 100 : 0,
    takeHomeRate: annualSalary > 0 ? (net / annualSalary) * 100 : 0,
  };
}
