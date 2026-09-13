import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb, FinalCta } from "@/components/blocks";
import { POSTS, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Crumb trail={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

      <section className="wrap" style={{ paddingTop: 20, paddingBottom: 56 }}>
        <div className="narrow">
          <p className="meta">{post.category}</p>
          <h1 style={{ margin: ".5rem 0 1rem" }}>{post.title}</h1>
          <p className="lede">{post.lede}</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 20 }}>
        <div className="shot shot-ph" style={{ height: 380, borderRadius: "var(--r)" }} />
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <div className="article">
            {post.blocks.map((b, i) => {
              if (b.t === "h2") return <h2 key={i}>{b.v}</h2>;
              if (b.t === "pull") return <p className="pull" key={i}>{b.v}</p>;
              if (b.t === "ul")
                return (
                  <ul key={i}>
                    {b.v.map((li) => <li key={li.slice(0, 20)}>{li}</li>)}
                  </ul>
                );
              return <p key={i}>{b.v}</p>;
            })}
            <div className="btn-row">
              {post.cta.map((c, i) => (
                <Link key={c.href} className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`} href={c.href}>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
