import type { Metadata } from "next";
import { Crumb, FinalCta } from "@/components/blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rental terms",
  description:
    "Bond, minimum age, tolls, kilometre limits, payment and vehicle swap terms for hiring from Affordable Car Rentals.",
  alternates: { canonical: "/rental-terms" },
};

export default function TermsPage() {
  return (
    <>
      <Crumb trail={[{ label: "Rental terms" }]} />

      <section className="wrap phead">
        <h1>Rental terms</h1>
        <p className="lede">
          The conditions that apply to every hire, stated plainly. Nothing here
          should be a surprise at the counter — if something isn&apos;t clear, ask
          before you pay a deposit.
        </p>
      </section>

      <section className="sec-tight">
        <div className="wrap">
          <div className="article">
            <p className="note">
              <strong>Draft for review.</strong> This page sets out the commercial
              terms taken from the client&apos;s existing policies. It needs a
              legal review before launch, and should be linked from every enquiry form.
            </p>

            <h2>Eligibility</h2>
            <p>
              All drivers must be at least 25 years of age, as required by our
              insurer. A current, valid Australian driver&apos;s licence must be
              presented at pickup, along with a second form of identification. We
              do not conduct credit checks and do not require financial history.
            </p>

            <h2>Deposit, bond and payment</h2>
            <ul>
              <li>A $100 holding deposit confirms a reservation and is credited towards the bond.</li>
              <li>A minimum bond of $500 is payable at pickup.</li>
              <li>The first week&apos;s rent is payable at pickup.</li>
              <li>Rent is charged weekly in advance for the duration of the hire.</li>
              <li>The bond is refunded within 21 days of the hire ending, provided there are no outstanding amounts, unpaid tolls, fines or damage to the vehicle. The 21-day period allows time for infringements and toll notices to be issued.</li>
            </ul>

            <h2>Kilometres</h2>
            <p>
              Unlimited kilometres are included within a 250km radius of the Sydney
              CBD. Travel beyond that radius must be agreed with us in advance.
            </p>

            <h2>Tolls</h2>
            <p>
              All tolls are the customer&apos;s responsibility. A Linkt account or
              e-tag must be provided at pickup. Where one is not provided, toll
              charges will be added to the weekly rent together with a $10
              administration fee.
            </p>

            <h2>Fuel</h2>
            <p>
              Fuel is the customer&apos;s responsibility. Vehicles are supplied and
              must be returned at the same fuel level.
            </p>

            <h2>Insurance, registration and servicing</h2>
            <p>
              On standard weekly hire, comprehensive insurance, registration, CTP
              and scheduled servicing are included in the weekly rate. Any
              applicable insurance excess remains the customer&apos;s
              responsibility in the event of an at-fault incident.
            </p>
            <p>
              <strong>Rent to own agreements are different.</strong> Under a rent to
              own agreement, insurance, registration and maintenance become the
              customer&apos;s responsibility from the start of the agreement. These
              costs will be set out in writing before the agreement is signed.
            </p>

            <h2>Maintenance and repairs</h2>
            <p>
              On standard weekly hire, we are responsible for servicing and
              mechanical repairs. Customers must report faults promptly and must not
              authorise repairs without our agreement. Damage caused by misuse,
              neglect or unauthorised drivers is chargeable to the customer.
            </p>

            <h2>Vehicle swaps</h2>
            <p>
              If a vehicle is not suitable for your needs, we will swap it for
              another vehicle from the fleet at no cost, subject to availability.
            </p>

            <h2>Fines and infringements</h2>
            <p>
              Traffic, parking and toll infringements incurred during the hire are
              the customer&apos;s responsibility and will be transferred to the
              driver on record.
            </p>

            <h2>Rideshare use</h2>
            <p>
              Vehicles hired for rideshare are supplied with the insurance
              documentation required by Uber and Didi. Customers are responsible for
              maintaining their own platform approvals and for complying with
              platform requirements.
            </p>

            <h2>Rent to own</h2>
            <p>
              A $1,000 deposit plus the first week&apos;s payment is required to
              commence a rent to own agreement. Weekly payments contribute towards
              ownership of the vehicle, which transfers at the end of the agreed
              term. Insurance, registration and maintenance are the customer&apos;s
              responsibility for the duration.
            </p>

            <h2>Ending a hire</h2>
            <p>
              Standard weekly hires require notice before the end of a paid week.
              Vehicles must be returned to {site.addressLine} during business hours,
              in the condition supplied, fair wear and tear excepted.
            </p>

            <p className="meta" style={{ marginTop: "2.6rem" }}>
              Last updated: [date]. {site.name}, ABN {site.abn}.
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        heading="Questions before you commit?"
        body="Call and ask. We would much rather explain it now than argue about it later."
      />
    </>
  );
}
