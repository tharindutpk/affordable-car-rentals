"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Our fleet" },
  { href: "/rent-to-own", label: "Rent to own" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation, otherwise it stays open over the
  // new page.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="util">
        <div className="wrap">
          <span>{site.addressLine}</span>
          <span>Mon–Fri 9am–5pm · Sat &amp; Sun by appointment</span>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
      </div>

      <header className="nav">
        <div className="wrap">
          <Link className="nav-logo" href="/" aria-label="Affordable Car Rentals, home">
            <Image
              src="/logo.png"
              alt="Affordable Car Rentals"
              width={312}
              height={202}
              priority
              style={{ height: 46, width: "auto" }}
            />
          </Link>

          <button
            className="navtoggle"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={open ? "M6 6l12 12M18 6L6 18" : "M3 6h18M3 12h18M3 18h18"} />
            </svg>
          </button>

          <ul id="primary-nav" className={open ? "open" : undefined}>
            {NAV.map((item) => {
              const current =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={current ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link className="btn btn-primary" href="/cars">
            See available cars
          </Link>
        </div>
      </header>
    </>
  );
}
