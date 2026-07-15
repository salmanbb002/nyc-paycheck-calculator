import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/nyc-income-tax-guide/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/nyc-salary-guide/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/paycheck-calculator-methodology/", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/nyc-paycheck-calculator-faq/", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return pages.map((page) => ({
    url: `https://nycpaycheckcalculator.site${page.path}`,
    lastModified: new Date("2026-07-16"),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
