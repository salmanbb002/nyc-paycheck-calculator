import { ArrowRight, CalendarDays, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { CalculatorAction } from "@/shared/components/CalculatorAction";
import { blogPosts } from "@/shared/content/blog";

type RelatedLink = { label: string; href: string };

type BlogLayoutProps = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  relatedGuides: RelatedLink[];
  heroArt?: ReactNode;
  children: ReactNode;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function BlogLayout({
  slug,
  category,
  title,
  dek,
  publishedDate,
  updatedDate,
  readTime,
  relatedGuides,
  heroArt,
  children,
}: BlogLayoutProps) {
  const morePosts = blogPosts.filter((post) => post.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-stone-950">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <Link href="/blog/" className="hover:text-stone-950">
              Blog
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page" className="text-stone-700">
              {category}
            </span>
          </nav>
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold text-emerald-700">{category}</p>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-stone-950 sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-stone-600 sm:text-xl">
              {dek}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-stone-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-emerald-700" aria-hidden="true" />
                Published <time dateTime={publishedDate}>{dateFormatter.format(new Date(publishedDate))}</time>
                {updatedDate !== publishedDate ? (
                  <>
                    {" "}
                    &middot; Updated <time dateTime={updatedDate}>{dateFormatter.format(new Date(updatedDate))}</time>
                  </>
                ) : null}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-emerald-700" aria-hidden="true" />
                {readTime}
              </span>
              <span>By the NYC Paycheck Calculator editorial team</span>
            </div>
          </div>
          {heroArt ? (
            <div className="mt-10 max-w-5xl overflow-hidden rounded-3xl border border-stone-200">
              {heroArt}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <article className="min-w-0 space-y-12 lg:col-span-8">{children}</article>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="space-y-7 rounded-3xl border border-stone-200 bg-stone-50 p-6 lg:sticky lg:top-24">
              <div>
                <p className="text-sm font-semibold text-stone-950">Run your own numbers</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Get an instant estimate using your salary, pay schedule, filing status,
                  and pre-tax deductions.
                </p>
                <CalculatorAction className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-stone-800">
                  Open calculator
                  <ArrowRight className="size-4" aria-hidden="true" />
                </CalculatorAction>
              </div>

              {relatedGuides.length > 0 ? (
                <div className="border-t border-stone-200 pt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Related guides
                  </p>
                  <nav aria-label="Related guides" className="space-y-3">
                    {relatedGuides.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between gap-3 text-sm font-medium text-stone-700 hover:text-emerald-800"
                      >
                        {item.label}
                        <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>
                </div>
              ) : null}

              {morePosts.length > 0 ? (
                <div className="border-t border-stone-200 pt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    More from the blog
                  </p>
                  <nav aria-label="More blog posts" className="space-y-3">
                    {morePosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}/`}
                        className="block text-sm font-medium text-stone-700 hover:text-emerald-800"
                      >
                        {post.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
