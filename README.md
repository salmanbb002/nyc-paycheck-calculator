# NYC Paycheck Calculator

A redesigned, static NYC paycheck calculator using 2026 federal, New York State,
New York City, and FICA tax assumptions.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run lint
npm run build
```

The production build is exported to `out/` and can be hosted on any static host.

## Scope

The calculator estimates annual income tax and allocates it across the selected
number of pay periods. It assumes a W-2 employee, a full-year NYC resident,
standard deductions, and no dependents, credits, itemized deductions, or special
income. It is educational and is not tax advice.
