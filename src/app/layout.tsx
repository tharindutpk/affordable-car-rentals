import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallBar from "@/components/CallBar";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted by next/font at build time: no request to Google at runtime,
// no layout shift, and it keeps the site out of the third-party font
// request that usually shows up in a Lighthouse audit.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-display",
  display: "swap",
});
const text = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Weekly car hire in Sydney from $230 | Affordable Car Rentals",
    template: "%s | Affordable Car Rentals",
  },
  description:
    "Weekly car rental for Uber, Didi and delivery drivers in Sydney. Rego, insurance and servicing included. No credit check. West Ryde.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    url: site.url,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: site.name,
  url: site.url,
  telephone: "+61422571499",
  email: site.email,
  image: `${site.url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.suburb,
    addressRegion: site.address.state,
    postalCode: site.address.postcode,
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  areaServed: "Sydney, New South Wales",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CallBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </body>
    </html>
  );
}
