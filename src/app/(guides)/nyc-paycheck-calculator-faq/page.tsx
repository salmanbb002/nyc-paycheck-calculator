import type { Metadata } from "next";
import { GuidePage } from "@/shared/components/GuidePage";
import { faqs, siteUrl } from "@/shared/content/site";
import { createArticleJsonLd, createPageMetadata } from "@/shared/lib/seo";

const path = "/nyc-paycheck-calculator-faq/";
const title = "NYC Paycheck Calculator FAQ";
const description =
  "Answers to common NYC paycheck questions about city income tax, withholding differences, pre-tax deductions, 2026 updates, and calculator limits.";

export const metadata: Metadata = createPageMetadata({ title, description, path });

export default function FaqPage() {
  const articleStructuredData = createArticleJsonLd({ title, description, path });
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${siteUrl}${path}`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <GuidePage
        currentPath={path}
        eyebrow="Calculator FAQ"
        title="NYC paycheck questions, answered plainly"
        description="Quick explanations of the tax assumptions, paycheck differences, and limitations behind the 2026 NYC take-home pay estimate."
      >
        <section>
          <h2 className="text-3xl font-semibold text-stone-950">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group py-1" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-stone-950 marker:hidden">
                  {faq.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-stone-300 text-lg font-normal text-stone-500 group-open:bg-stone-950 group-open:text-white">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <p className="max-w-3xl pb-7 pr-10 text-pretty leading-7 text-stone-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-emerald-50 p-7 sm:p-9">
          <h2 className="text-2xl font-semibold text-stone-950">A useful planning estimate</h2>
          <p className="mt-4 text-pretty leading-7 text-stone-600">
            Use the result to compare salaries, pay frequencies, and simple pre-tax
            contribution scenarios. For payroll corrections, estimated payments, or tax
            filing decisions, consult a qualified payroll or tax professional.
          </p>
        </section>
      </GuidePage>
    </>
  );
}
