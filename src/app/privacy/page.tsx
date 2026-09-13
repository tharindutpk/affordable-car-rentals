import type { Metadata } from "next";
import { Crumb } from "@/components/blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Affordable Car Rentals collects, uses and stores your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Crumb trail={[{ label: "Privacy" }]} />
      <section className="wrap phead">
        <h1>Privacy policy</h1>
      </section>
      <section className="sec-tight">
        <div className="wrap">
          <div className="article">
            <p className="note">
              <strong>Placeholder.</strong> This needs writing against the
              Australian Privacy Principles before launch. It must cover what the
              enquiry forms collect (name, phone, email, vehicle interest), where
              it is sent ({site.email}), how long it is kept, and who to contact to
              have it deleted. Do not publish the site with this page as-is.
            </p>
            <h2>What we collect</h2>
            <p>
              When you send an enquiry through this website we collect your name,
              phone number, email address and anything you write in the message
              field. Nothing else is collected automatically beyond standard server
              logs.
            </p>
            <h2>What we do with it</h2>
            <p>
              We use it to respond to your enquiry and to arrange a rental. We do
              not sell it and we do not pass it to third parties for marketing.
            </p>
            <h2>Contact</h2>
            <p>
              To ask what we hold about you, or to have it deleted, email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
