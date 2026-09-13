import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link href="/" aria-label="Affordable Car Rentals, home">
              <Image
                src="/logo-white.png"
                alt="Affordable Car Rentals"
                width={312}
                height={202}
                style={{ height: 52, width: "auto" }}
              />
            </Link>
            <p style={{ marginTop: "1.2rem", maxWidth: "34ch", fontSize: ".9rem" }}>
              Weekly car hire for Sydney&apos;s rideshare and delivery drivers.
              Registered, insured and maintained — you just drive.
            </p>
          </div>

          <div>
            <h4>Our fleet</h4>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/rent/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
              <li><Link href="/rent-to-own">Rent to own</Link></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/how-it-works">How it works</Link></li>
              <li><Link href="/insurance-replacement">Insurance replacement</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/rental-terms">Rental terms</Link></li>
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>
                {site.address.street}
                <br />
                {site.address.suburb} {site.address.state} {site.address.postcode}
              </li>
              <li>ABN {site.abn}</li>
            </ul>
          </div>
        </div>

        <div className="legal">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>
            <Link href="/rental-terms">Rental terms</Link> ·{" "}
            <Link href="/privacy">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
