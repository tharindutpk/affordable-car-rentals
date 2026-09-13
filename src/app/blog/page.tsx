import type { Metadata } from "next";
import Link from "next/link";
import { Crumb, FinalCta } from "@/components/blocks";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — guides for Sydney drivers",
  description:
    "Guides for Sydney rideshare and delivery drivers: Uber Green, rent to own, and what it really costs to drive for a living.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Crumb trail={[{ label: "Blog" }]} />

      <section className="wrap phead">
        <h1>Guides for drivers</h1>
        <p className="lede">
          Written for people who drive for a living, by people who rent them the cars.
        </p>
      </section>

      <section className="sec-tight">
        <div className="wrap" style={{ display: "grid", gap: 28 }}>
          {POSTS.map((p) => (
            <article className="postcard" key={p.slug}>
              <div className="shot shot-ph" style={{ height: 230, borderRadius: 0 }} />
              <div className="postcard-body">
                <p className="meta mb0">{p.category}</p>
                <h2 style={{ fontSize: "1.6rem", margin: ".4rem 0 .7rem" }}>
                  <Link href={`/blog/${p.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {p.title}
                  </Link>
                </h2>
                <p style={{ color: "var(--muted)", fontSize: ".97rem" }}>{p.excerpt}</p>
                <Link className="btn btn-ghost btn-sm" href={`/blog/${p.slug}`}>Read it</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
