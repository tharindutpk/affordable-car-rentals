#!/usr/bin/env node
/**
 * Seeds the 16 real vehicles into Sanity so nobody types them in by hand.
 *
 *   1. Create a write token: sanity.io/manage -> your project -> API -> Tokens
 *      -> Add API token -> Editor.
 *   2. SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs
 *
 * Safe to run more than once: every document gets a deterministic _id derived
 * from its slug and is written with createOrReplace, so a second run updates
 * rather than duplicating.
 *
 * Photos are NOT seeded. Upload those in the Studio once the fleet has been
 * reshot — the site shows a silhouette placeholder until then.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing config.\n\n" +
      "  SANITY_PROJECT_ID=<id> SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs\n",
  );
  process.exit(1);
}

// The same file the Next app reads, so there is only ever one copy of the
// fleet data in the repo.
const vehicles = JSON.parse(
  readFileSync(join(here, "..", "src", "lib", "fleet.json"), "utf8"),
);

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const docs = vehicles.map((v) => ({
  _id: `vehicle-${v.slug}`,
  _type: "vehicle",
  title: v.title,
  slug: { _type: "slug", current: v.slug },
  year: v.year,
  weeklyRate: v.weeklyRate,
  availability: v.availability,
  categories: v.categories,
  rentToOwn: v.rentToOwn,
  note: v.note,
  seats: v.seats,
  fuel: v.fuel,
  transmission: v.transmission,
  body: v.body,
}));

const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());

try {
  await tx.commit();
  console.log(`Seeded ${docs.length} vehicles into ${projectId}/${dataset}.`);
  console.log("Open the Studio and upload a photo for each one.");
} catch (err) {
  console.error("Seed failed:", err.message);
  process.exit(1);
}
