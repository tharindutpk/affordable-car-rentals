import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Produces https://<hostname>.sanity.studio on `npm run studio:deploy`.
  studioHost: "affordable-car-rentals",
});
