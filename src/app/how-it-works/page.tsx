import type { Metadata } from "next";
import { Crumb, FinalCta, Steps, Visit } from "@/components/blocks";
import { Tick } from "@/components/icons";

export const metadata: Metadata = {
  title: "How renting from us works — bond, deposit and what to bring",
  description:
    "What it costs to start, what to bring to pickup, how the $500 bond works and when it comes back. Plain answers before you commit.",
  alternates: { canonical: "/how-it-works" },
};

const BRING = [
  "Current Australian driver's licence",
  "A Linkt account or e-tag for tolls",
  "The balance of the $500 bond",
  "Your first week's rent",
  "A second form of ID",
];

export default function HowItWorksPage() {
  return (
    <>
      <Crumb trail={[{ label: "How it works" }]} />

      <section className="wrap phead">
        <h1>What it takes to drive away</h1>
        <p className="lede">
          No financial history, no long application. Here&apos;s every number and
          document involved, so there&apos;s nothing to discover at the counter.
        </p>
      </section>

      <section className="sec-tight"><div className="wrap"><Steps /></div></section>

      <section className="sec haze">
        <div className="wrap grid-2" style={{ gap: 64, alignItems: "start" }}>
          <div>
            <h2>What it costs to start</h2>
            <table className="tbl" style={{ marginTop: "1.2rem" }}>
              <tbody>
                <tr><th>Holding deposit</th><td>$100, refunded into your bond</td></tr>
                <tr><th>Bond</th><td>$500 minimum, refundable</td></tr>
                <tr><th>First week&apos;s rent</th><td>$230 – $399 depending on the car</td></tr>
                <tr><th>Bond returned</th><td>Within 21 days of the rental ending</td></tr>
                <tr><th>Minimum age</th><td>25, for insurance reasons</td></tr>
                <tr><th>Credit check</th><td>None</td></tr>
              </tbody>
            </table>
            <p style={{ marginTop: "1.4rem", fontSize: ".95rem", color: "var(--muted)" }}>
              The 21 days on the bond isn&apos;t us holding your money for the sake
              of it. Tolls and fines take weeks to come through from the issuing
              authorities, and we need them settled before we can release the full
              amount.
            </p>
          </div>
          <div>
            <h2>What to bring to pickup</h2>
            <ul className="incl one" style={{ marginTop: "1.2rem" }}>
              {BRING.map((b) => <li key={b}><Tick />{b}</li>)}
            </ul>
            <p className="note" style={{ marginTop: "1.6rem" }}>
              <strong>No Linkt or e-tag?</strong> We&apos;ll still hand over the
              car, but tolls get added to your weekly rent along with a $10 admin
              fee each time. Setting up a Linkt account takes about five minutes
              online and saves you that fee.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap grid-2" style={{ gap: 64, alignItems: "start" }}>
          <div>
            <h2>Refer a driver, cut your rent</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Send someone our way and your next week gets cheaper. Most of our
              customers come from another customer, which is why this is worth more
              to us than advertising.
            </p>
            <ul className="terms on-light" style={{ marginTop: "1.6rem" }}>
              <li><b>$50</b><span>One referral</span></li>
              <li><b>$100</b><span>Two referrals</span></li>
            </ul>
            <p style={{ marginTop: "1.4rem", fontSize: ".95rem", color: "var(--muted)" }}>
              Discounts stack up to $100 off a single week. Your referral just needs
              to mention your name when they sign up.
            </p>
          </div>
          <div>
            <h2>If the car isn&apos;t right</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Tell us and we&apos;ll swap it. No cost, no argument.
            </p>
            <p style={{ color: "var(--muted)", fontSize: ".96rem" }}>
              A car that looks right on a listing can turn out wrong for your actual
              shifts — too thirsty, too small in the boot, uncomfortable over ten
              hours. You shouldn&apos;t be stuck with it for the rest of the term.
              Call us and we&apos;ll move you into something else from the fleet.
            </p>
            <p style={{ color: "var(--muted)", fontSize: ".96rem" }}>
              The same applies if the car needs work. Repairs and servicing are ours
              to deal with, not yours.
            </p>
          </div>
        </div>
      </section>

      <Visit />
      <FinalCta />
    </>
  );
}
