# Editorial photos

Drop image files here, then point `src/lib/images.ts` at them. Blog post images
are set on each post in `src/lib/posts.ts`.

Car photos do **not** go here — those are uploaded through the Sanity Studio.

## The slots

| Where | Key / field | Export at | What works |
|---|---|---|---|
| Home, rent-to-own band | `SITE_IMAGES.rentToOwn` | 1200×800 | Handing over keys. Sits on dark navy, so a bright subject reads best. |
| Home, insurance band | `SITE_IMAGES.insuranceReplacement` | 1200×800 | The workshop, or a replacement car ready to go. |
| About, "Six years on Victoria Road" | `SITE_IMAGES.aboutYard` | 1200×800 | The premises, with cars and a person in shot. Not an empty car park. |
| Blog card | `POSTS[].image` | 1200×800 | Anything that reads at thumbnail size. |
| Blog post header | `POSTS[].image` | same file, used wider | Same. |

Every slot crops to fill with `object-fit: cover`, so the exact ratio matters
less than having enough resolution. Keep the subject near the centre.

## Before you commit

```bash
# strip EXIF (location data included) and compress
npx sharp-cli -i original.jpg -o rent-to-own.jpg resize 1200 800 --fit cover
```

Or anything else — Squoosh, ImageOptim, TinyPNG. Aim for under 200KB each.
Next converts them to AVIF/WebP on the fly, but it can't fix a 6MB original.

**Check EXIF before pushing.** Phone photos carry GPS coordinates. For a
business address that's already public it's not sensitive, but it's sloppy, and
if any shot was taken somewhere else it's a genuine leak.

## Leaving a slot empty

Fine. It renders the silhouette placeholder, which looks intentional. Filling
two of five is better than filling all five with bad photos.
