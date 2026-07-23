export type BlogHeroVariant = "paycheck" | "wage" | "teacher-housing";

export type BlogPostSummary = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  focusKeyword: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  heroVariant: BlogHeroVariant;
};

export const blogPosts: BlogPostSummary[] = [
  {
    slug: "salary-vs-take-home-pay-nyc",
    title: "Salary vs. Take-Home Pay in NYC: Why Your Paycheck Is Smaller Than Your Offer Letter",
    dek: "A $100,000 offer in New York City never turns into $100,000 in your bank account. Here's every deduction between the number in your offer letter and the number in your checking account.",
    category: "Paychecks & Taxes",
    focusKeyword: "salary vs take home pay nyc",
    publishedDate: "2026-07-24",
    updatedDate: "2026-07-24",
    readTime: "9 min read",
    heroVariant: "paycheck",
  },
  {
    slug: "ny-minimum-wage-2026-increase",
    title: "New York's 2026 Minimum Wage Increase: What Changed and What Comes Next",
    dek: "New York's minimum wage rose again on January 1, 2026—and it's the last increase set directly by law. Here's the new rates by region, why they differ, and how automatic increases will work starting in 2027.",
    category: "Wages & Policy",
    focusKeyword: "new york minimum wage increase 2026",
    publishedDate: "2026-07-24",
    updatedDate: "2026-07-24",
    readTime: "7 min read",
    heroVariant: "wage",
  },
  {
    slug: "nyc-teacher-salary-affordable-housing",
    title: "Can an NYC Teacher Afford NYC? Salary, Take-Home Pay, and the Affordable Housing Math",
    dek: "A first-year NYC teacher earns a real, public salary. What that becomes after tax—and whether it clears the income bar for the city's own affordable housing lotteries—are two different questions.",
    category: "Careers & Housing",
    focusKeyword: "nyc teacher salary take home pay",
    publishedDate: "2026-07-24",
    updatedDate: "2026-07-24",
    readTime: "8 min read",
    heroVariant: "teacher-housing",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
