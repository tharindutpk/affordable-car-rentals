import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Crumb } from "@/components/blocks";
import { site } from "@/lib/site";
import { getAllVehicles } from "@/lib/vehicles";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact us — West Ryde, Sydney",
  description:
    "Call 0422 571 499 or send an enquiry. We're at 1139 Victoria Rd, West Ryde NSW, open Monday to Friday 9am to 5pm.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const vehicles = await getAllVehicles();
  const mapQuery = encodeURIComponent(`${site.addressLine}, Australia`);

  return (
    <>
      <Crumb trail={[{ label: "Contact" }]} />

      <section className="wrap phead">
        <h1>Get in touch</h1>
        <p className="lede">
          Tell us what you&apos;re driving for and we&apos;ll match you to a car.
          Calling is fastest — most enquiries are sorted in one conversation.
        </p>
      </section>

      <section className="sec-tight">
        <div className="wrap grid-2" style={{ gap: 56, alignItems: "start" }}>
          <EnquiryForm heading="Send an enquiry" vehicles={vehicles} />

          <div>
            <h2 style={{ fontSize: "1.4rem" }}>Reach us directly</h2>
            <table className="tbl" style={{ marginTop: "1rem" }}>
              <tbody>
                <tr><th>Phone</th><td><a href={site.phoneHref}>{site.phone}</a></td></tr>
                <tr><th>Email</th><td><a href={`mailto:${site.email}`}>{site.email}</a></td></tr>
                <tr>
                  <th>Address</th>
                  <td>
                    {site.address.street}<br />
                    {site.address.suburb} {site.address.state} {site.address.postcode}
                  </td>
                </tr>
                <tr><th>ABN</th><td>{site.abn}</td></tr>
              </tbody>
            </table>

            <h3 style={{ fontFamily: "var(--text)", margin: "2rem 0 0" }}>Opening hours</h3>
            <table className="hours light">
              <tbody>
                {site.hours.map(([day, time]) => (
                  <tr key={day}><td>{day}</td><td>{time}</td></tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: "1rem", fontSize: ".9rem", color: "var(--muted)" }}>
              Weekend viewings are easy to arrange. Call or message and we&apos;ll
              meet you at the yard.
            </p>

            <div style={{ marginTop: "1.8rem", borderRadius: "var(--r)", overflow: "hidden", border: "1px solid var(--line)" }}>
              <iframe
                title="Map to Affordable Car Rentals, West Ryde"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%" height="260" loading="lazy"
                style={{ border: 0, display: "block" }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p style={{ marginTop: "1rem", fontSize: ".93rem", color: "var(--muted)" }}>
              On Victoria Road, minutes from the M4 and easy to reach from
              Parramatta, Ryde, Bankstown and the inner west. Street parking out front.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
