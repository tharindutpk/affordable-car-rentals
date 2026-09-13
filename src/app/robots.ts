import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Flip SITE_LIVE to "false" in the environment to block crawlers while the
  // site is still being built. Remember to set it back before launch.
  const live = process.env.SITE_LIVE !== "false";

  return {
    rules: live
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
