import Link from "next/link";
import { Tick } from "@/components/icons";
import { INCLUDED, STEPS, site } from "@/lib/site";

export function Crumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <div className="wrap">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {trail.map((t) => (
          <span key={t.label}>
            <i aria-hidden="true">›</i>
            {t.href ? <Link href={t.href}>{t.label}</Link> : t.label}
          </span>
        ))}
      </nav>
    </div>
  );
}

export function IncludedList({ single = false }: { single?: boolean }) {
  return (
    <ul className={`incl${single ? " one" : ""}`}>
      {INCLUDED.map((item) => (
        <li key={item}>
          <Tick />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Steps() {
  return (
    <div className="steps">
      {STEPS.map((s) => (
        <div className="step" key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} open={i === 0}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Visit() {
  return (
    <section className="sec brand-bg">
      <div className="wrap visit">
        <div>
          <h2>Come and see the car</h2>
          <p style={{ marginTop: "1rem" }}>
            We&apos;re on Victoria Road at West Ryde, a few minutes from the M4 and
            easy to reach from Parramatta, Ryde, Bankstown and the inner west.
          </p>
          <p style={{ marginTop: "1.2rem", color: "#fff", fontWeight: 500 }}>
            {site.address.street}
            <br />
            {site.address.suburb} {site.address.state} {site.address.postcode}
          </p>
          <div className="btn-row">
            <a className="btn btn-light" href={site.phoneHref}>
              Call {site.phone}
            </a>
            <Link className="btn btn-outline-light" href="/contact">
              Get directions
            </Link>
          </div>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--text)" }}>Opening hours</h4>
          <table className="hours">
            <tbody>
              {site.hours.map(([day, time]) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: "1.2rem", fontSize: ".88rem", opacity: 0.75 }}>
            Weekend viewings are easy to arrange — call or message and we&apos;ll
            meet you at the yard.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FinalCta({
  heading = "Tell us what you're driving for",
  body = "We'll match you to a car that fits the work and the budget, usually the same day.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="final">
      <div className="wrap">
        <h2>{heading}</h2>
        <p className="lede">{body}</p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/contact">
            Send an enquiry
          </Link>
          <a className="btn btn-ghost" href={site.phoneHref}>
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
