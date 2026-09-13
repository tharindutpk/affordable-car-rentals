import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import VehicleCard from "@/components/VehicleCard";
import VehiclePhoto from "@/components/VehiclePhoto";
import { Crumb, FinalCta, IncludedList } from "@/components/blocks";
import { vehicleImage } from "@/sanity/lib/image";
import { CATEGORIES, categoryName } from "@/lib/categories";
import { AVAILABILITY_LABEL, site } from "@/lib/site";
import {
  getAllVehicles,
  getVehicle,
  getVehicleSlugs,
  similarVehicles,
} from "@/lib/vehicles";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getVehicleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicle(slug);
  if (!v) return { title: "Car not found" };

  const title = `${v.year} ${v.title} — $${v.weeklyRate}/week`;
  const description = `Hire a ${v.year} ${v.title} in Sydney for $${v.weeklyRate} a week. ${v.seats} seats, ${v.fuel.toLowerCase()}, ${v.transmission.toLowerCase()}. Insurance, rego and servicing included.`;
  const img = vehicleImage(v.mainImage, 1200);

  return {
    title,
    description,
    alternates: { canonical: `/cars/${v.slug}` },
    openGraph: { title, description, images: img ? [img] : undefined },
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) notFound();

  const all = await getAllVehicles();
  const similar = similarVehicles(all, vehicle, 3);
  const isAvailable = vehicle.availability === "available";
  const green = vehicle.categories.includes("uber-green");

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${vehicle.year} ${vehicle.title}`,
    description: vehicle.note,
    image: vehicleImage(vehicle.mainImage, 1200),
    brand: { "@type": "Brand", name: vehicle.title.split(" ")[0] },
    offers: {
      "@type": "Offer",
      price: vehicle.weeklyRate,
      priceCurrency: "AUD",
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${site.url}/cars/${vehicle.slug}`,
      seller: { "@type": "Organization", name: site.name },
    },
  };

  return (
    <>
      <Crumb trail={[{ label: "Our fleet", href: "/cars" }, { label: vehicle.title }]} />

      {/* The H1 lives here, above the two columns. If it sat inside the sticky
          price box on the right, the document would emit an H2 before its H1. */}
      <section className="wrap" style={{ padding: "12px 22px 34px" }}>
        <span className={`avail${isAvailable ? "" : " is-out"}`}>
          {AVAILABILITY_LABEL[vehicle.availability]}
        </span>
        <h1 style={{ fontSize: "clamp(2.1rem,4.2vw,3.1rem)", margin: ".45rem 0 0" }}>
          {vehicle.year} {vehicle.title}
        </h1>
        <ul className="specs" style={{ marginTop: ".8rem", fontSize: ".95rem" }}>
          <li>{vehicle.seats} seats</li>
          <li>{vehicle.fuel}</li>
          <li>{vehicle.transmission}</li>
          <li>{vehicle.body}</li>
          {green ? <li>Uber Green eligible</li> : null}
        </ul>
      </section>

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap vdetail">
          <div>
            <div className="gallery">
              <VehiclePhoto vehicle={vehicle} width={1200} priority
                sizes="(max-width: 1000px) 100vw, 700px"
                style={{ height: 420, borderRadius: "var(--r)" }} />
              {vehicle.gallery?.length ? (
                <div className="thumbs">
                  {vehicle.gallery.slice(0, 4).map((_, i) => (
                    <VehiclePhoto key={i} vehicle={vehicle} width={300}
                      sizes="160px" style={{ height: 84, borderRadius: 8 }} />
                  ))}
                </div>
              ) : null}
            </div>

            {vehicle.note ? (
              <>
                <h2 style={{ marginTop: "2.6rem" }}>About this car</h2>
                <p style={{ marginTop: ".9rem", maxWidth: "66ch" }}>{vehicle.note}</p>
              </>
            ) : null}
            <p style={{ maxWidth: "66ch", color: "var(--muted)", fontSize: ".97rem" }}>
              Serviced on schedule by our own workshop, registered with CTP, and
              covered by comprehensive insurance for the length of your hire. If
              it isn&apos;t right for the work you&apos;re doing, we&apos;ll swap
              it for another vehicle at no cost.
            </p>

            <h2 style={{ marginTop: "2.6rem" }}>Specifications</h2>
            <table className="tbl" style={{ marginTop: "1rem" }}>
              <tbody>
                <tr><th>Year</th><td>{vehicle.year}</td></tr>
                <tr><th>Make and model</th><td>{vehicle.title}</td></tr>
                <tr><th>Seats</th><td>{vehicle.seats}</td></tr>
                <tr><th>Fuel</th><td>{vehicle.fuel}</td></tr>
                <tr><th>Transmission</th><td>{vehicle.transmission}</td></tr>
                <tr><th>Body</th><td>{vehicle.body}</td></tr>
                <tr>
                  <th>Suits</th>
                  <td>
                    {vehicle.categories
                      .filter((c) => CATEGORIES.some((x) => x.slug === c))
                      .map((c, i) => (
                        <span key={c}>
                          {i > 0 ? " · " : ""}
                          <Link href={`/rent/${c}`}>{categoryName(c)}</Link>
                        </span>
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ marginTop: "2.6rem" }}>Included in the ${vehicle.weeklyRate}</h2>
            <div style={{ marginTop: "1rem" }}><IncludedList /></div>
            <p style={{ marginTop: "1.4rem", fontSize: ".95rem", color: "var(--muted)" }}>
              You cover fuel and tolls. A Linkt account or e-tag is required at
              pickup; without one, tolls plus a $10 admin fee are added to your
              weekly rent.
            </p>

            <h2 style={{ marginTop: "3rem" }} id="enquire">
              Enquire about this {vehicle.body.toLowerCase()}
            </h2>
            <div style={{ marginTop: "1.2rem" }}>
              <EnquiryForm
                vehicle={vehicle}
                submitLabel={isAvailable ? "Send enquiry" : "Ask when it's back"}
              />
            </div>
          </div>

          <aside className="vbox">
            <h2 style={{ fontSize: "1.3rem", margin: "0 0 .2rem" }}>{vehicle.title}</h2>
            <span className="yr">
              {vehicle.year} · {vehicle.fuel} · {vehicle.seats} seats
            </span>
            <div style={{ paddingTop: "1.3rem", marginTop: "1.3rem", borderTop: "1px solid var(--line)" }}>
              <span className="price">${vehicle.weeklyRate}</span>
              <span style={{ display: "block", fontSize: ".85rem", color: "var(--muted)", marginTop: ".5rem" }}>
                per week — rego, insurance and servicing included
              </span>
            </div>
            <div style={{ display: "grid", gap: ".6rem", marginTop: "1.4rem" }}>
              <Link className="btn btn-primary" href="#enquire">
                {isAvailable ? "Enquire about this car" : "Ask when it's back"}
              </Link>
              <a className="btn btn-ghost" href={site.phoneHref}>Call {site.phone}</a>
            </div>
            <p style={{ fontSize: ".84rem", color: "var(--muted)", margin: "1.2rem 0 0" }}>
              $100 holding deposit reserves it. $500 bond and your first week are
              due at pickup.
            </p>
            {vehicle.rentToOwn ? (
              <p className="note" style={{ marginTop: "1.2rem" }}>
                <strong>Available on rent to own.</strong> Put your weekly payments
                towards owning this car. $1,000 deposit, no credit check.{" "}
                <Link href="/rent-to-own">See how it works</Link>.
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      {similar.length ? (
        <section className="sec haze">
          <div className="wrap">
            <div className="head">
              <div><h2>Similar cars</h2></div>
              <Link className="btn btn-ghost" href="/cars">See the whole fleet</Link>
            </div>
            <div className="grid-3">
              {similar.map((v) => <VehicleCard key={v.slug} vehicle={v} />)}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta
        heading="Want to see it in person?"
        body="Call ahead and we'll have it out of the yard and ready when you arrive."
      />

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
