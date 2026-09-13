import { sanityClient } from "@/sanity/lib/client";
import {
  ALL_VEHICLES,
  RENT_TO_OWN_VEHICLES,
  VEHICLES_BY_CATEGORY,
  VEHICLE_BY_SLUG,
  VEHICLE_SLUGS,
} from "@/sanity/lib/queries";
import type { Vehicle } from "@/lib/types";
import { SEED_VEHICLES } from "@/lib/seed";

/**
 * Every read goes through here.
 *
 * If Sanity is not configured yet (fresh clone, no env vars) the site falls
 * back to the seed fleet so it still builds and runs. That means a new
 * developer can `npm run dev` and see a working site before touching the CMS,
 * and a missing env var or an outage degrades to stale data rather than a 500.
 *
 * Freshness comes from each route's `export const revalidate`, not from a
 * per-request cache setting, so the whole page is regenerated on a timer.
 */
async function fetchOrSeed<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    const data = await sanityClient.fetch<T>(query, params);
    if (data === null || (Array.isArray(data) && data.length === 0)) return fallback;
    return data;
  } catch (err) {
    console.error("[sanity] query failed, serving fallback:", err);
    return fallback;
  }
}

const byAvailabilityThenPrice = (a: Vehicle, b: Vehicle) =>
  Number(a.availability !== "available") - Number(b.availability !== "available") ||
  a.weeklyRate - b.weeklyRate;

export async function getAllVehicles(): Promise<Vehicle[]> {
  return fetchOrSeed<Vehicle[]>(
    ALL_VEHICLES,
    {},
    [...SEED_VEHICLES].sort(byAvailabilityThenPrice),
  );
}

export async function getVehiclesByCategory(category: string): Promise<Vehicle[]> {
  return fetchOrSeed<Vehicle[]>(
    VEHICLES_BY_CATEGORY,
    { category },
    SEED_VEHICLES.filter((v) => v.categories.includes(category)).sort(
      byAvailabilityThenPrice,
    ),
  );
}

export async function getVehicle(slug: string): Promise<Vehicle | null> {
  return fetchOrSeed<Vehicle | null>(
    VEHICLE_BY_SLUG,
    { slug },
    SEED_VEHICLES.find((v) => v.slug === slug) ?? null,
  );
}

export async function getVehicleSlugs(): Promise<string[]> {
  return fetchOrSeed<string[]>(
    VEHICLE_SLUGS,
    {},
    SEED_VEHICLES.map((v) => v.slug),
  );
}

export async function getRentToOwnVehicles(): Promise<Vehicle[]> {
  return fetchOrSeed<Vehicle[]>(
    RENT_TO_OWN_VEHICLES,
    {},
    SEED_VEHICLES.filter((v) => v.rentToOwn).sort((a, b) => a.weeklyRate - b.weeklyRate),
  );
}

export function lowestRate(vehicles: Vehicle[]): number {
  return vehicles.reduce((min, v) => Math.min(min, v.weeklyRate), Infinity);
}

export function similarVehicles(all: Vehicle[], current: Vehicle, n = 3): Vehicle[] {
  return all
    .filter(
      (v) =>
        v.slug !== current.slug &&
        v.categories.some((c) => current.categories.includes(c)),
    )
    .slice(0, n);
}
