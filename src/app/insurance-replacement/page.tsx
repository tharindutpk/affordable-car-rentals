import type { Metadata } from "next";
import Link from "next/link";
import InsuranceForm from "@/components/InsuranceForm";
import { Crumb, Visit } from "@/components/blocks";
import { Tick } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insurance replacement vehicles in Sydney",
  description:
    "Approved insurance replacement vehicle provider in Sydney. Not-at-fault hire arranged directly with your insurer at no cost to you.",
  alternates: { canonical: "/insurance-replacement" },
};

const POINTS = [
  "No cost to you when you're not at fault",
  "We invoice the insurer, not you",
  "Same-day pickup where we have the car",
  "Like-for-like where possible — including vans",
  "Rideshare drivers keep earning through the repair",
];

export default function InsurancePage() {
  return (
    <>
      <Crumb trail={[{ label: "Insurance replacement" }]} />

      <section className="wrap phead">
        <h1>Car in the smash repairer?</h1>
        <p className="lede">
          We&apos;re an approved replacement vehicle provider for most Australian
          insurers. If the accident wasn&apos;t your fault, the hire is arranged
          directly with your insurer and costs you nothing.
        </p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="#form">Start a replacement hire</Link>
          <a className="btn btn-ghost" href={site.phoneHref}>Call {site.phone}</a>
        </div>
      </section>

      <section className="sec-tight haze">
        <div className="wrap grid-2" style={{ gap: 60, alignItems: "start" }}>
          <div>
            <h2>How it usually goes</h2>
            <p style={{ marginTop: "1rem", color: "var(--muted)" }}>
              Your car goes in for repairs and suddenly you can&apos;t get to
              work, do the school run, or keep driving for Uber. Most people
              either go without or pay for a rental out of their own pocket while
              they wait on a claim.
            </p>
            <p style={{ color: "var(--muted)" }}>
              If you weren&apos;t at fault, you&apos;re usually entitled to a
              replacement vehicle for the length of the repair. We deal with the
              insurer directly. You deal with us.
            </p>
          </div>
          <ul className="incl one">
            {POINTS.map((p) => <li key={p}><Tick />{p}</li>)}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2>Three steps</h2>
          <div className="steps" style={{ marginTop: "2.4rem" }}>
            <div className="step">
              <h3>Send us the claim</h3>
              <p>Claim number, your insurer, and which repairer has the car. Use the form below or call and read it out to us.</p>
            </div>
            <div className="step">
              <h3>We confirm with the insurer</h3>
              <p>We check the entitlement and the expected repair time directly with them, and tell you what we can put you in.</p>
            </div>
            <div className="step">
              <h3>Collect from West Ryde</h3>
              <p>Bring your licence. The car stays with you until the repair is finished, and we handle the return with the insurer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec haze" id="form">
        <div className="wrap grid-2" style={{ gap: 60, alignItems: "start" }}>
          <div>
            <h2>Start a replacement hire</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Fill this in and we&apos;ll call you back the same business day. If
              it&apos;s urgent, ring <a href={site.phoneHref}>{site.phone}</a> — that&apos;s faster.
            </p>
            <p className="note" style={{ marginTop: "1.6rem" }}>
              <strong>Not sure if you&apos;re covered?</strong> Send it anyway. We
              check the entitlement with your insurer at no cost, and tell you
              either way.
            </p>
          </div>
          <InsuranceForm />
        </div>
      </section>

      <Visit />
    </>
  );
}
