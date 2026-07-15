export const siteUrl = "https://nycpaycheckcalculator.site";

export const primaryNavigation = [
  { label: "Tax guide", href: "/nyc-income-tax-guide/" },
  { label: "Salary guide", href: "/nyc-salary-guide/" },
  { label: "Methodology", href: "/paycheck-calculator-methodology/" },
  { label: "FAQ", href: "/nyc-paycheck-calculator-faq/" },
];

export const faqs = [
  {
    question: "Does New York City really have its own income tax?",
    answer:
      "Yes. Full-year residents of Manhattan, Brooklyn, Queens, the Bronx, and Staten Island generally pay NYC resident income tax, even if they work outside the city. Most nonresidents who commute into NYC do not pay the city resident tax.",
  },
  {
    question: "Why is this different from the amount on my pay stub?",
    answer:
      "This tool estimates annual tax liability and spreads it across your selected pay periods. Actual employer withholding uses your W-4 and IT-2104 elections and can include dependents, credits, benefits, garnishments, multiple jobs, and employer-specific payroll timing.",
  },
  {
    question: "Do pre-tax deductions reduce every tax?",
    answer:
      "Not always. Traditional 401(k) contributions generally reduce income taxes but still face Social Security and Medicare tax. Some benefits, such as eligible HSA or FSA deductions made through payroll, may also reduce FICA. This estimate takes the conservative approach and leaves FICA on gross wages.",
  },
  {
    question: "Which 2026 updates are included?",
    answer:
      "The calculator includes the IRS 2026 federal brackets and standard deductions, the $184,500 Social Security wage base, New York's 2026 rate reduction for lower and middle brackets, and current NYC resident rates.",
  },
  {
    question: "Can I use this to make a tax filing decision?",
    answer:
      "Use it for planning and job-offer comparisons, not as a return or professional tax opinion. It omits itemized deductions, dependents, most credits, bonuses, stock compensation, multiple jobs, and New York's high-income recapture calculations.",
  },
];
