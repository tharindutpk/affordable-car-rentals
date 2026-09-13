import type { Metadata } from "next";
import Link from "next/link";
import VehicleCard from "@/components/VehicleCard";
import { Crumb, Faq, FinalCta } from "@/components/blocks";
import { Cross, Tick } from "@/components/icons";
import { RENT_TO_OWN_FAQS } from "@/lib/faqs";
import { site } from "@/lib/site";
import { getRentToOwnVehicles } from "@/lib/vehicles";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Rent to own a car in Sydney — no credit check",
  description:
    "Rent to own a car in Sydney with $1,000 down and no credit check. Weekly payments go towards owning the vehicle outright.",
  alternates: { canonical: "/rent-to-own" },
};

const INCLUDED = [
  "The vehicle, from day one",
  "Paperwork handled by us",
  "No credit check or financial history",
  "Ownership at the end of the term",
];
const YOURS = [
  "Comprehensive insurance",
  "Registration and CTP",
  "Servicing and maintenance",
  "Fuel and tolls",
];

export default async function RentToOwnPage() {
  const vehicles = await getRentToOwnVehicles();

  return (
    <>
      <Crumb trail={[{ label: "Rent to own" }]} />

      <section className="wrap phead">
        <h1>Rent the car. Then keep it.</h1>
        <p className="lede">
          Banks turn people down every day for things that have nothing to do
          with whether they can drive. Rent to own skips the loan application
          entirely. You pay weekly, and at the end of the term the car is yours.
        </p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="#cars">See eligible cars</Link>
          <a className="btn btn-ghost" href={site.phoneHref}>Talk it through — {site.phone}</a>
        </div>
      </section>

      <section className="sec-tight haze">
        <div className="wrap grid-3">
          <div className="callout">
            <h2 style={{ fontSize: "1.22rem" }}>$1,000 to start</h2>
            <p style={{ margin: ".6rem 0 0", color: "var(--muted)", fontSize: ".96rem" }}>
              A $1,000 deposit plus your first week&apos;s payment gets you in the
              car. That&apos;s the whole upfront cost.
            </p>
          </div>
          <div className="callout">
            <h2 style={{ fontSize: "1.22rem" }}>No credit check</h2>
            <p style={{ margin: ".6rem 0 0", color: "var(--muted)", fontSize: ".96rem" }}>
              You&apos;re not applying for finance, so there&apos;s no loan
              application, no credit file enquiry and no history to explain.
            </p>
          </div>
          <div className="callout">
            <h2 style={{ fontSize: "1.22rem" }}>Payments build ownership</h2>
            <p style={{ margin: ".6rem 0 0", color: "var(--muted)", fontSize: ".96rem" }}>
              Every weekly payment goes towards owning the car, instead of
              disappearing into someone else&apos;s asset.
            </p>
          </div>
        </div>
      </section>

      {/* The client's own FAQ says insurance, rego and maintenance transfer to
          the customer on rent to own, while every other product includes them.
          Surfacing that here rather than burying it prevents a furious
          customer in month two. */}
      <section className="sec">
        <div className="wrap grid-2" style={{ gap: 64, alignItems: "start" }}>
          <div>
            <h2>What&apos;s included, and what isn&apos;t</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              This is the part other companies bury. Rent to own works differently
              from our weekly hire, and you should know exactly how before you put
              money down.
            </p>
            <p style={{ color: "var(--muted)", fontSize: ".96rem" }}>
              On a standard weekly rental we carry the insurance, registration and
              servicing. On rent to own you&apos;re on the path to owning the car,
              so those costs transfer to you — the same as they would if
              you&apos;d bought it. We&apos;ll price all three out with you before
              you sign anything, so there are no surprises in month two.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--text)", marginBottom: ".4rem" }}>Included</h3>
            <ul className="incl one">
              {INCLUDED.map((i) => <li key={i}><Tick />{i}</li>)}
            </ul>
            <h3 style={{ fontFamily: "var(--text)", margin: "2rem 0 .4rem" }}>Your responsibility</h3>
            <ul className="incl one">
              {YOURS.map((i) => <li key={i}><Cross />{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec haze">
        <div className="wrap">
          <h2>How it works</h2>
          <div className="steps" style={{ marginTop: "2.4rem" }}>
            <div className="step">
              <h3>Pick the car</h3>
              <p>Choose from the vehicles below, or ask us — most of the fleet can be put on a rent to own agreement if the term suits.</p>
            </div>
            <div className="step">
              <h3>Pay $1,000 and the first week</h3>
              <p>We go through the weekly amount, the term, and what insurance and rego will cost you. Nothing is signed until you&apos;re happy with all three numbers.</p>
            </div>
            <div className="step">
              <h3>Drive it, then own it</h3>
              <p>Pay weekly. At the end of the agreed term the car is yours outright, with the transfer handled by us.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="cars">
        <div className="wrap">
          <div className="head">
            <div>
              <h2>Cars available on rent to own</h2>
              <p className="lede">
                Not seeing the one you want? Most of the fleet can go on an
                agreement. Ask us.
              </p>
            </div>
            <Link className="btn btn-ghost" href="/cars">See the whole fleet</Link>
          </div>
          <div className="grid-3">
            {vehicles.map((v, i) => <VehicleCard key={v.slug} vehicle={v} priority={i < 3} />)}
          </div>
        </div>
      </section>

      <section className="sec haze">
        <div className="wrap grid-2" style={{ gap: 70 }}>
          <div>
            <h2>Questions people ask first</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              If yours isn&apos;t here, call. We&apos;d rather answer it now than
              after you&apos;ve paid a deposit.
            </p>
            <Link className="btn btn-ghost" style={{ marginTop: "1rem" }} href="/faq">
              All questions
            </Link>
          </div>
          <Faq items={RENT_TO_OWN_FAQS} />
        </div>
      </section>

      <FinalCta
        heading="Ready to stop renting someone else's car?"
        body="Call and we'll work out the weekly number on the car you want, including what rego and insurance will really cost."
      />
    </>
  );
}
