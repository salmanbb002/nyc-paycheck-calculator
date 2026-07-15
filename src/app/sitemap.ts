import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nycpaycheckcalculator.site",
      lastModified: new Date("2026-07-15"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
