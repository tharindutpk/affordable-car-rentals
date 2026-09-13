import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteImageRef } from "@/lib/images";

interface Props {
  image?: SiteImageRef;
  /** Extra classes on the wrapper, e.g. "dark" for the navy band. */
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
}

/**
 * One editorial image slot. Renders the photo if the manifest has one,
 * otherwise the silhouette placeholder.
 *
 * Uses `fill` rather than fixed width/height because every slot is a
 * fixed-height box that crops — `.shot` is already `position: relative` and
 * `.shot img` already applies `object-fit: cover`.
 */
export default function SiteImage({
  image,
  className = "",
  style,
  sizes = "(max-width: 940px) 100vw, 560px",
  priority = false,
}: Props) {
  if (!image?.src) {
    return <div className={`shot shot-ph ${className}`.trim()} style={style} />;
  }

  return (
    <div className={`shot ${className}`.trim()} style={style}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}
