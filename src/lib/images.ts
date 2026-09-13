/**
 * Editorial images — the photos that aren't cars.
 *
 * These live in /public rather than Sanity on purpose. There are five of them
 * and they change maybe once a year; a schema, a query and a CDN round trip
 * for that is more machinery than the job needs. Vehicle photos are different
 * and do belong in the CMS, because Sue changes those constantly.
 *
 * To add one:
 *   1. Drop the file in public/photos/
 *   2. Fill in `src` and `alt` below
 *   3. Commit and push
 *
 * Leave `src` empty and the slot renders the silhouette placeholder, which
 * looks deliberate. Half-filled is fine — you don't need all five at once.
 *
 * Alt text is not optional. Google reads it and screen readers depend on it.
 * Describe what is in the photo, not what it is for: "Sue handing keys to a
 * customer outside the West Ryde yard", not "rent to own image".
 */

export interface SiteImageRef {
  src: string;
  alt: string;
}

export const SITE_IMAGES: Record<string, SiteImageRef> = {
  /**
   * Homepage, "Rent the car. Then keep it." band.
   * Sits on the dark navy background, so a photo with a bright subject works
   * best. Handing over keys, or a customer with their car.
   * Export at 1200x800.
   */
  rentToOwn: {
    src: "/photos/rent-own.jpg", // e.g. "/photos/rent-to-own.jpg"
    alt: "",
  },

  /**
   * Homepage, "Car in the smash repairer?" band.
   * The yard, the workshop, or a replacement car ready to go out.
   * Export at 1200x800.
   */
  insuranceReplacement: {
    src: "/photos/car-to-car.jpg",
    alt: "",
  },

  /**
   * About page, "Six years on Victoria Road".
   * The strongest trust image on the site — the actual premises, ideally with
   * cars and a person in it. Avoid an empty car park.
   * Export at 1200x800.
   */
  aboutYard: {
    src: "/photos/yard-picture.jpg", // e.g. "/photos/west-ryde-yard.jpg"
    alt: "",
  },
};

export function siteImage(
  key: keyof typeof SITE_IMAGES,
): SiteImageRef | undefined {
  const img = SITE_IMAGES[key];
  return img?.src ? img : undefined;
}
