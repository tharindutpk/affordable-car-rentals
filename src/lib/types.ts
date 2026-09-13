/**
 * Minimal shape of a Sanity image reference. Declared locally rather than
 * imported from the `sanity` package so the Next app has no dependency on the
 * Studio's dependency tree.
 */
export interface SanityImage {
  _type?: string;
  asset?: { _ref?: string; _type?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export type Availability = "available" | "on-hire" | "coming-soon";

export interface Vehicle {
  _id?: string;
  title: string;
  slug: string;
  year: number;
  weeklyRate: number;
  availability: Availability;
  categories: string[];
  rentToOwn: boolean;
  note?: string;
  seats: number;
  fuel: string;
  transmission: string;
  body: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
}

export interface CategoryDef {
  slug: string;
  name: string;
  h1: string;
  title: string;
  description: string;
  lede: string;
  points: string[];
  body: string[];
  cardBlurb: string;
}
