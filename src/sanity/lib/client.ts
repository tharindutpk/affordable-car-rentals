import { createClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const isSanityConfigured = Boolean(projectId);

/**
 * Reads go through Sanity's CDN. That matters on the free plan: cached CDN
 * requests have a far larger monthly quota than uncached API requests, and
 * freshness is handled by Next's `revalidate` on each route instead.
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN || undefined,
      perspective: "published",
    })
  : null;
