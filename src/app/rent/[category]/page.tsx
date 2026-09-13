import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VehicleCard from "@/components/VehicleCard";
import { Crumb, FinalCta, Steps } from "@/components/blocks";
import { Tick } from "@/components/icons";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { site } from "@/lib/site";
import { getAllVehicles, getVehiclesByCategory, lowestRate } from "@/lib/vehicles";

export const revalidate = 60;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return { title: "Not found" };
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/rent/${c.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const def = getCategory(category);
  if (!def) notFound();

  const [vehicles, all] = await Promise.all([
    getVehiclesByCategory(category),
    getAllVehicles(),
  ]);
  const from = vehicles.length ? lowestRate(vehicles) : null;

  return (
    <>
      <Crumb trail={[{ label: "Our fleet", href: "/cars" }, { label: def.name }]} />

      <section className="wrap phead">
        <h1>{def.h1}</h1>
        <p className="lede">{def.lede}</p>
        <ul className="chips">
          <li><Link className="chip" href="/cars">All <b>{all.length}</b></Link></li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link className="chip" href={`/rent/${c.slug}`}
                aria-current={c.slug === def.slug ? "page" : undefined}>
                {c.name}{" "}
                <b>{all.filter((v) => v.categories.includes(c.slug)).length}</b>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec-tight haze">
        <div className="wrap grid-2" style={{ gap: 60, alignItems: "start" }}>
          <div className="article" style={{ maxWidth: "none" }}>
            {def.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <ul className="incl one">
            {def.points.map((p) => (
              <li key={p}><Tick />{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <div>
              <h2>
                {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"}
                {from !== null ? ` from $${from} a week` : ""}
              </h2>
              <p className="lede">
                Availability changes weekly. Call <a href={site.phoneHref}>{site.phone}</a>{" "}
                to confirm before you come in.
              </p>
            </div>
          </div>
          <div className="grid-3">
            {vehicles.map((v, i) => (
              <VehicleCard key={v.slug} vehicle={v} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec haze">
        <div className="wrap">
          <h2>How it works</h2>
          <div style={{ marginTop: "2.4rem" }}><Steps /></div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
