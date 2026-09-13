import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "./client";
import type { SanityImage } from "@/lib/types";

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;

/** 3:2 crop at a given width — the ratio every card, hero and gallery uses. */
export function vehicleImage(
  source: SanityImage | undefined,
  width = 900,
): string | undefined {
  if (!builder || !source?.asset) return undefined;
  return builder
    .image(source as SanityImageSource)
    .width(width)
    .height(Math.round((width / 3) * 2))
    .fit("crop")
    .auto("format")
    .url();
}
