import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/shared/content/blog";
import { BlogHeroArt } from "@/shared/components/illustrations/BlogHeroArt";
import { createPageMetadata } from "@/shared/lib/seo";
import { siteUrl } from "@/shared/content/site";

const path = "/blog/";
const title = "NYC Paycheck Blog";
const description =
  "Explainers on NYC paychecks, salaries, minimum wage, and affordable housing—grounded in the same 2026 tax data behind the calculator.";

export const metadata: Metadata = createPageMetadata({ title, description, path });

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function BlogIndexPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: title,
    description,
    url: `${siteUrl}${path}`,
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}/`,
      datePublished: post.publishedDate,
      dateModified: post.updatedDate,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="mb-4 text-sm font-semibold text-emerald-700">Blog</p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-stone-950 sm:text-6xl">
            NYC paychecks, explained
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-stone-600 sm:text-xl">
            Deeper dives on the numbers behind the calculator—salary, taxes, minimum
            wage, and what a paycheck actually buys in New York City.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-colors hover:border-emerald-200"
              >
                <div className="aspect-[3/1] w-full overflow-hidden border-b border-stone-200">
                  <BlogHeroArt
                    variant={post.heroVariant}
                    title={post.title}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 group-hover:bg-emerald-50/40 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  {post.category}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-snug text-stone-950">
                  {post.title}
                </h2>
                <p className="mt-3 text-pretty text-sm leading-6 text-stone-600">{post.dek}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-stone-500">
                  <span>
                    <time dateTime={post.publishedDate}>
                      {dateFormatter.format(new Date(post.publishedDate))}
                    </time>{" "}
                    &middot; {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 group-hover:text-emerald-950">
                    Read
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
