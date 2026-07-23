import type { Metadata } from "next";
import { siteUrl } from "@/shared/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;

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
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}

type BlogPostingJsonLdInput = PageMetadataInput & {
  datePublished: string;
  dateModified: string;
  faq?: { question: string; answer: string }[];
};

export function createBlogPostingJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  faq,
}: BlogPostingJsonLdInput) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: title,
      description,
      url: `${siteUrl}${path}`,
      datePublished,
      dateModified,
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
      mainEntityOfPage: `${siteUrl}${path}`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "NYC Paycheck Calculator", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog/` },
        { "@type": "ListItem", position: 3, name: title, item: `${siteUrl}${path}` },
      ],
    },
  ];

  if (faq && faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
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
