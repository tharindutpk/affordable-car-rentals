import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Fixed bottom bar, mobile only. Most visitors arrive on a phone, often
 * mid-shift, so the phone number should never be more than one tap away.
 */
export default function CallBar() {
  return (
    <nav className="callbar" aria-label="Quick contact">
      <a href={site.phoneHref}>Call {site.phone}</a>
      <Link className="is-primary" href="/contact">
        Enquire
      </Link>
    </nav>
  );
}
