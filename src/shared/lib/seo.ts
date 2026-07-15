import type { Metadata } from "next";
import { siteUrl } from "@/shared/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "NYC Paycheck Calculator",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function createArticleJsonLd({
  title,
  description,
  path,
}: PageMetadataInput) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description,
        url: `${siteUrl}${path}`,
        datePublished: "2026-07-16",
        dateModified: "2026-07-16",
        author: {
          "@type": "Organization",
          name: "NYC Paycheck Calculator",
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "NYC Paycheck Calculator",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.svg`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "NYC Paycheck Calculator",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: `${siteUrl}${path}`,
          },
        ],
      },
    ],
  };
}
