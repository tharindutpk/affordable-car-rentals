import type { Vehicle } from "@/lib/types";
import fleet from "@/lib/fleet.json";

/**
 * The current fleet, transcribed from the client's own inventory listing.
 *
 * Held as JSON rather than TypeScript so that `scripts/seed-sanity.mjs` can
 * read the exact same file when importing these cars into the CMS. One copy
 * of the data, two consumers.
 *
 * This is a fallback, not the source of truth. Once the cars are in Sanity
 * every page reads from there instead. Two reasons it exists:
 *
 *   1. The site builds and runs before the CMS is set up, so you can develop
 *      and deploy without blocking on content entry.
 *   2. If Sanity is unreachable at request time, pages serve stale data rather
 *      than a 500. A rental site briefly showing last week's prices beats a
 *      rental site that is down.
 */
export const SEED_VEHICLES = fleet as Vehicle[];
