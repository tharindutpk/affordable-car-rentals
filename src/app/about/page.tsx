import type { Metadata } from "next";
import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import { Crumb, Visit } from "@/components/blocks";
import { SITE_IMAGES } from "@/lib/images";
import { site } from "@/lib/site";
import { getAllVehicles } from "@/lib/vehicles";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About us — West Ryde, Sydney",
  description:
    "Six years renting cars to Sydney's rideshare, delivery and private drivers from our yard on Victoria Road, West Ryde.",
  alternates: { canonical: "/about" },
};

const REASONS = [
  ["No credit check", "We don't ask for financial history. A bank's opinion of you has nothing to do with whether you can drive."],
  ["Unlimited kilometres", "Within 250km of the CBD. Others charge up to 20c a kilometre, which quietly doubles the cost of driving for a living."],
  ["Free swaps", "If the car doesn't suit the work, we change it. You're not locked into a mistake."],
  ["We do the maintenance", "Servicing and repairs are on us. A breakdown costs you a phone call, not a week's earnings."],
  ["Rent to own", "A path to owning a car for people the finance industry won't touch. $1,000 down, no loan application."],
  ["Insurance approved", "Approved replacement provider for most insurers, so a not-at-fault repair doesn't cost you a car."],
];

export default async function AboutPage() {
  const vehicles = await getAllVehicles();

  return (
    <>
      <Crumb trail={[{ label: "About" }]} />

      <section className="wrap phead">
        <h1>We rent cars to people who need them to earn</h1>
        <p className="lede">
          Most of our customers aren&apos;t going on holiday. They&apos;re driving
          for Uber, delivering parcels, getting to a job site, or replacing a car
          that&apos;s off the road. That shapes everything about how we run the place.
        </p>
      </section>

      <section className="sec-tight">
        <div className="wrap band">
          <div>
            <h2>Six years on Victoria Road</h2>
            <p style={{ marginTop: "1.1rem" }}>
              We started with a handful of hybrids and a simple idea: make the
              weekly rate cover everything, so a driver knows exactly what a car
              costs them before they commit. Rego, comprehensive insurance,
              servicing, repairs and unlimited kilometres, in one number.
            </p>
            <p>
              That&apos;s still how it works. We&apos;ve grown to {vehicles.length}{" "}
              vehicles across hybrids, sedans, seven seaters and vans, and
              we&apos;re an approved replacement vehicle provider for most
              Australian insurers.
            </p>
            <p>
              We&apos;re a small operation. When you call, you speak to someone who
              knows every car in the yard.
            </p>
          </div>
          <SiteImage
            image={SITE_IMAGES.aboutYard}
            style={{ height: 330, borderRadius: "var(--r)" }}
          />
        </div>
      </section>

      <section className="sec haze">
        <div className="wrap">
          <h2>How we&apos;re different</h2>
          <div className="grid-3" style={{ marginTop: "2.4rem" }}>
            {REASONS.map(([title, body]) => (
              <div className="callout" key={title}>
                <h3>{title}</h3>
                <p style={{ margin: ".6rem 0 0", color: "var(--muted)", fontSize: ".96rem" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap narrow" style={{ textAlign: "center" }}>
          <h2>Who you&apos;ll be dealing with</h2>
          <p className="lede" style={{ margin: "1rem auto 0" }}>
            We&apos;re not a call centre. Come to the yard, look at the car, ask the
            awkward questions about bonds and tolls and what happens if it breaks
            down. You&apos;ll get straight answers from the person who&apos;ll be
            handing you the keys.
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link className="btn btn-primary" href="/cars">See the fleet</Link>
            <a className="btn btn-ghost" href={site.phoneHref}>Call {site.phone}</a>
          </div>
        </div>
      </section>

      <Visit />
    </>
  );
}
