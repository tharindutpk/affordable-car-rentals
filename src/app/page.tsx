import Link from "next/link";
import VehicleCard from "@/components/VehicleCard";
import VehiclePhoto from "@/components/VehiclePhoto";
import { FinalCta, Faq, IncludedList, Steps, Visit } from "@/components/blocks";
import { CATEGORIES } from "@/lib/categories";
import { HOME_FAQS } from "@/lib/faqs";
import { PURPOSES, site } from "@/lib/site";
import { getAllVehicles, lowestRate } from "@/lib/vehicles";

export const revalidate = 60;

export default async function HomePage() {
  const vehicles = await getAllVehicles();
  const available = vehicles.filter((v) => v.availability === "available");
  const from = lowestRate(vehicles);
  const featured = available[0];

  const byCategory = Object.fromEntries(
    CATEGORIES.map((c) => [
      c.slug,
      vehicles.filter((v) => v.categories.includes(c.slug)),
    ]),
  );

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              Drive away this week from <span className="rule">${from}</span>
            </h1>
            <p className="lede" style={{ marginTop: "1.3rem", fontSize: "1.2rem" }}>
              Weekly car hire for rideshare, delivery and everyday driving in
              Sydney. Rego, comprehensive insurance and servicing are all in the
              rate. No credit check.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/cars">See what&apos;s available</Link>
              <a className="btn btn-ghost" href={site.phoneHref}>Call {site.phone}</a>
            </div>
            <div className="facts">
              <div><b>$500</b><span>Refundable bond</span></div>
              <div><b>250km</b><span>Unlimited kms within Sydney</span></div>
              <div><b>6+ yrs</b><span>Renting across Sydney</span></div>
              <div><b>Uber</b><span>Approved vehicles, insured and ready</span></div>
            </div>
          </div>

          {featured ? (
            <div className="feature">
              <VehiclePhoto vehicle={featured} width={1000} priority
                sizes="(max-width: 940px) 100vw, 500px" />
              <div className="feature-body">
                <span className="avail">Available now</span>
                <h2 style={{ marginTop: ".45rem", fontSize: "1.22rem" }}>{featured.title}</h2>
                <span className="yr">
                  {featured.year} · {featured.fuel}
                  {featured.categories.includes("uber-green") ? " · Uber Green eligible" : ""}
                </span>
                <ul className="specs">
                  <li>{featured.seats} seats</li>
                  <li>{featured.transmission}</li>
                  <li>{featured.body}</li>
                </ul>
                <div className="card-foot">
                  <div className="rate">
                    <span className="price">${featured.weeklyRate}</span>
                    <span>per week, all in</span>
                  </div>
                  <Link className="btn btn-primary btn-sm" href={`/cars/${featured.slug}`}>
                    View car
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="sec-tight haze">
        <div className="wrap">
          <div className="filter">
            <div className="field">
              <label htmlFor="f1">I need a car for</label>
              <select id="f1" defaultValue={PURPOSES[0]}>
                {PURPOSES.slice(0, 6).map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f2">Seats</label>
              <select id="f2"><option>Any</option><option>2 seats</option><option>5 seats</option><option>7 seats</option></select>
            </div>
            <div className="field">
              <label htmlFor="f3">Weekly budget</label>
              <select id="f3"><option>Any</option><option>Under $250</option><option>$250 – $300</option><option>$300 +</option></select>
            </div>
            <Link className="btn btn-primary" href="/cars">Show cars</Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="head">
            <div>
              <h2>Pick the car that suits the job</h2>
              <p className="lede">
                Every vehicle is registered, comprehensively insured and
                mechanically maintained by us. You cover fuel and tolls — that&apos;s it.
              </p>
            </div>
          </div>
          <div className="cats">
            {CATEGORIES.map((c) => {
              const items = byCategory[c.slug] ?? [];
              return (
                <Link className="cat" href={`/rent/${c.slug}`} key={c.slug}>
                  <h3>{c.name}</h3>
                  <p>{c.cardBlurb}</p>
                  {items.length ? (
                    <span className="from">From ${lowestRate(items)}/week</span>
                  ) : null}
                </Link>
              );
            })}
            <Link className="cat" href="/rent-to-own">
              <h3>Rent to own</h3>
              <p>Put your weekly payments towards owning the car. $1,000 down, no credit check, no loan application.</p>
              <span className="from">$1,000 deposit</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="sec haze">
        <div className="wrap">
          <div className="head">
            <div>
              <h2>Available this week</h2>
              <p className="lede">
                Updated as cars come back in. Call to confirm before you make the
                trip out to West Ryde.
              </p>
            </div>
            <Link className="btn btn-ghost" href="/cars">
              View all {vehicles.length} vehicles
            </Link>
          </div>
          <div className="grid-3">
            {available.slice(0, 3).map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap grid-2">
          <div>
            <h2>What&apos;s in the weekly rate</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Most rental companies charge per kilometre and bill you for
              servicing. We don&apos;t. One weekly payment covers the car and
              everything that keeps it legal and on the road.
            </p>
            <p style={{ marginTop: "1.4rem", fontSize: ".95rem", color: "var(--muted)" }}>
              You cover fuel and tolls. Tolls need a Linkt account or e-tag at
              pickup — without one we pass on the toll plus a $10 admin fee.
            </p>
          </div>
          <div><IncludedList /></div>
        </div>
      </section>

      <section className="sec haze">
        <div className="wrap">
          <div className="head">
            <div><h2>Three steps to the keys</h2></div>
            <Link className="btn btn-ghost" href="/how-it-works">What to bring</Link>
          </div>
          <Steps />
        </div>
      </section>

      <section className="sec brand-bg">
        <div className="wrap band">
          <div>
            <h2>Rent the car. Then keep it.</h2>
            <p style={{ marginTop: "1.1rem", maxWidth: "52ch" }}>
              Banks turn people down every day for things that have nothing to do
              with whether they can drive. Rent to own skips the loan application
              entirely — you pay weekly, and at the end of the term the car is yours.
            </p>
            <ul className="terms">
              <li><b>$1,000</b><span>Deposit to start</span></li>
              <li><b>No</b><span>Credit check</span></li>
              <li><b>Weekly</b><span>Payments towards ownership</span></li>
            </ul>
            <div className="btn-row">
              <Link className="btn btn-light" href="/rent-to-own">How rent to own works</Link>
            </div>
          </div>
          <div className="shot shot-ph dark" style={{ height: 330, borderRadius: "var(--r)" }} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap band">
          <div className="shot shot-ph" style={{ height: 300, borderRadius: "var(--r)" }} />
          <div>
            <h2>Car in the smash repairer?</h2>
            <p className="lede" style={{ marginTop: "1.1rem" }}>
              We&apos;re an approved replacement vehicle provider for most
              Australian insurers. If you&apos;re not at fault, the hire is
              arranged directly with your insurer and costs you nothing.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/insurance-replacement">
                Start a replacement hire
              </Link>
              <a className="btn btn-ghost" href={site.phoneHref}>Call us</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec haze">
        <div className="wrap grid-2" style={{ gap: 70 }}>
          <div>
            <h2>Straight answers</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              The things people ask before they come in. If yours isn&apos;t here,
              call and ask — we&apos;d rather tell you now than at pickup.
            </p>
            <Link className="btn btn-ghost" style={{ marginTop: "1rem" }} href="/faq">
              Read all questions
            </Link>
          </div>
          <Faq items={HOME_FAQS} />
        </div>
      </section>

      <Visit />
      <FinalCta />
    </>
  );
}
