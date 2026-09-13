import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="final">
      <div className="wrap">
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
          That page has been returned to the yard
        </h1>
        <p className="lede" style={{ margin: "1rem auto 0" }}>
          It might have been a car that&apos;s no longer with us. The whole fleet
          is one click away.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/cars">See the fleet</Link>
          <a className="btn btn-ghost" href={site.phoneHref}>Call {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
