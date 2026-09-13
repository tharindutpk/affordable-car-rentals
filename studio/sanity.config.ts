import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

/**
 * Sanity Studio — the CMS Sue logs into to add and edit cars.
 *
 * It lives in its own workspace, with its own package.json, and is deployed
 * free to <studioHost>.sanity.studio. Three reasons it is not embedded in the
 * Next app at /studio:
 *
 *   1. The Studio bundle is large. Building it alongside Next needs more RAM
 *      than the cheapest DigitalOcean instances have.
 *   2. Sanity and Next both move fast. Keeping them in separate dependency
 *      trees means a Next major upgrade can never be blocked by a Studio peer
 *      dependency — which is exactly what happened with next-sanity.
 *   3. Sue gets a login URL that does not break when the website redeploys.
 */
export default defineConfig({
  name: "affordable-car-rentals",
  title: "Affordable Car Rentals",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
