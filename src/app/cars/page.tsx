import type { Metadata } from "next";
import Link from "next/link";
import VehicleCard from "@/components/VehicleCard";
import { Crumb, FinalCta } from "@/components/blocks";
import { CATEGORIES } from "@/lib/categories";
import { site } from "@/lib/site";
import { getAllVehicles } from "@/lib/vehicles";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our fleet — cars, vans and utes from $230/week",
  description:
    "Browse every car, van and ute available for weekly hire in Sydney. Prices, seats, fuel and availability updated as vehicles come back in.",
  alternates: { canonical: "/cars" },
};

export default async function FleetPage() {
  const vehicles = await getAllVehicles();
  const availableCount = vehicles.filter((v) => v.availability === "available").length;
  const r2oCount = vehicles.filter((v) => v.rentToOwn).length;

  return (
    <>
      <Crumb trail={[{ label: "Our fleet" }]} />

      <section className="wrap phead">
        <h1>
          {vehicles.length} vehicles, {availableCount} ready now
        </h1>
        <p className="lede">
          Everything we own, with the real weekly rate. Rego, insurance,
          servicing and unlimited kilometres are in every price on this page.
        </p>
        <ul className="chips">
          <li><Link className="chip" href="/cars" aria-current="page">All <b>{vehicles.length}</b></Link></li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link className="chip" href={`/rent/${c.slug}`}>
                {c.name}{" "}
                <b>{vehicles.filter((v) => v.categories.includes(c.slug)).length}</b>
              </Link>
            </li>
          ))}
          <li><Link className="chip" href="/rent-to-own">Rent to own <b>{r2oCount}</b></Link></li>
        </ul>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="grid-3">
            {vehicles.map((v, i) => (
              <VehicleCard key={v.slug} vehicle={v} priority={i < 3} />
            ))}
          </div>
          <p className="lede" style={{ marginTop: "2.6rem" }}>
            Can&apos;t see what you need? We move cars in and out every week. Call{" "}
            <a href={site.phoneHref}>{site.phone}</a> and tell us what the job is.
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
