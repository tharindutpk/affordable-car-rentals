import type { Metadata } from "next";
import { Crumb, Faq, FinalCta } from "@/components/blocks";
import { FAQ_GROUPS } from "@/lib/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Bond, minimum age, tolls, unlimited kilometres, rent to own and rideshare requirements — answered plainly.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  // FAQPage schema. These questions match long-tail searches almost word for
  // word, so the markup is worth the twenty minutes it takes.
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };

  return (
    <>
      <Crumb trail={[{ label: "FAQ" }]} />

      <section className="wrap phead">
        <h1>Frequently asked questions</h1>
        <p className="lede">
          Everything people ask before they come in, grouped so you can find
          yours. If it isn&apos;t here, call <a href={site.phoneHref}>{site.phone}</a>{" "}
          — we&apos;d rather answer it now than at pickup.
        </p>
      </section>

      <section className="sec-tight">
        <div className="wrap" style={{ maxWidth: 900 }}>
          {FAQ_GROUPS.map((g) => (
            <div className="faq-group" key={g.name}>
              <h2 style={{ fontSize: "1.22rem", marginBottom: ".9rem" }}>{g.name}</h2>
              <Faq items={g.items} />
            </div>
          ))}
        </div>
      </section>

      <FinalCta
        heading="Still not sure?"
        body="Call and ask. No obligation, and we'll tell you straight if we're not the right fit."
      />

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
