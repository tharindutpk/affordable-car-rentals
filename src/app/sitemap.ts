import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { POSTS } from "@/lib/posts";
import { site } from "@/lib/site";
import { getVehicleSlugs } from "@/lib/vehicles";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const slugs = await getVehicleSlugs();

  const staticPages = [
    ["", 1],
    ["/cars", 0.9],
    ["/rent-to-own", 0.9],
    ["/insurance-replacement", 0.8],
    ["/how-it-works", 0.7],
    ["/about", 0.6],
    ["/faq", 0.7],
    ["/blog", 0.5],
    ["/contact", 0.7],
    ["/rental-terms", 0.3],
    ["/privacy", 0.2],
  ] as const;

  return [
    ...staticPages.map(([path, priority]) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      priority,
    })),
    ...CATEGORIES.map((c) => ({
      url: `${site.url}/rent/${c.slug}`,
      lastModified: now,
      priority: 0.9,
    })),
    ...slugs.map((slug) => ({
      url: `${site.url}/cars/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...POSTS.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: now,
      priority: 0.5,
    })),
  ];
}
