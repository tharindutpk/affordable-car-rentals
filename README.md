# Affordable Car Rentals — Next.js site

Weekly car hire for Sydney rideshare and delivery drivers. Next.js 16 front
end, Sanity as the CMS for the fleet, Resend for enquiry email, deployed on
DigitalOcean with automatic SSL.

```
acr-next/
├── src/
│   ├── app/              App Router pages + server actions
│   ├── components/       Header, footer, cards, forms
│   ├── lib/              Site copy, categories, FAQs, posts, fleet.json
│   └── sanity/lib/       Content Lake client, GROQ queries, image URLs
├── studio/               Sanity Studio — its own workspace, own package.json
├── scripts/
│   └── seed-sanity.mjs   Imports the 16 real cars into the CMS
└── public/               Logo, in four variants
```

---

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

**It works before you configure anything.** With no Sanity credentials the site
reads the 16 real vehicles from `src/lib/fleet.json` and renders every page.
That means you can develop, style and deploy without waiting on content entry,
and a missing environment variable in production degrades to stale data instead
of a 500.

---

## Connecting the CMS

### 1. Create the project

```bash
cd studio
npm install
npx sanity login
npx sanity init --create-project "Affordable Car Rentals" --dataset production
```

That prints a **project ID**. Put it in both env files:

```bash
# .env.local (the website)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345
NEXT_PUBLIC_SANITY_DATASET=production

# studio/.env (the CMS)
SANITY_STUDIO_PROJECT_ID=abc12345
SANITY_STUDIO_DATASET=production
```

### 2. Seed the fleet

Rather than typing sixteen cars in by hand:

```bash
# sanity.io/manage -> API -> Tokens -> Add API token -> Editor
SANITY_PROJECT_ID=abc12345 SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs
```

Re-running it updates rather than duplicates — each document gets a
deterministic `_id` from its slug and is written with `createOrReplace`.

Photos aren't seeded. Upload those in the Studio once the fleet has been
reshot; until then the site shows a silhouette placeholder, which looks
deliberate rather than broken.

### 3. Deploy the Studio

```bash
npm run studio:deploy     # -> https://affordable-car-rentals.sanity.studio
```

Sue logs in there to add cars, change prices and flip availability. Add her at
sanity.io/manage → Members.

### Why the Studio is a separate workspace

It would be tidier to embed it at `/studio` inside the Next app, and that's the
setup most tutorials show. Three reasons this project doesn't:

1. **Build memory.** The Studio bundle is large. Building it alongside Next
   needs more RAM than DigitalOcean's cheapest instances have, and a build that
   OOMs at 2am is a bad trade for one less URL.
2. **Dependency coupling.** This is not hypothetical: `next-sanity`, the usual
   glue package, doesn't support Next 16 yet. Had the Studio been embedded, the
   whole site would be stuck on Next 15. With separate workspaces the website
   depends only on `@sanity/client`, which has no framework peer dependencies
   and cannot block a Next upgrade.
3. **A stable login URL.** `*.sanity.studio` doesn't change when the website
   redeploys.

If you'd rather embed it later, the schema in `studio/schemaTypes/` moves
across unchanged.

---

## How content reaches the page

Every read goes through `src/lib/vehicles.ts`. Nothing calls Sanity directly.

```
Sanity Content Lake
   ↓ GROQ (src/sanity/lib/queries.ts)
@sanity/client  — useCdn: true
   ↓
src/lib/vehicles.ts  — falls back to fleet.json on any failure
   ↓
Server Components   — export const revalidate = 60
```

Two deliberate choices there.

**`useCdn: true`.** On Sanity's free plan, cached CDN requests have a far
larger monthly quota than uncached API requests. Freshness is handled by Next's
route-level `revalidate` instead, so pages regenerate on a timer and the CDN
never becomes stale in a way anyone notices.

**`revalidate = 60`.** A price change in the Studio appears within a minute.
Availability is the field Sue will change most often, so the window is short;
raise it if the request quota ever becomes a concern.

Adding a field means touching three files: the schema in
`studio/schemaTypes/vehicle.ts`, the projection in
`src/sanity/lib/queries.ts`, and the `Vehicle` interface in `src/lib/types.ts`.

---

## Email

Enquiries go to `CONTACT_TO_EMAIL`. Change that one variable and every form on
the site redirects — the vehicle enquiry, the general contact form and the
insurance replacement request.

```bash
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@affordablecarrentals.com.au
CONTACT_FROM_EMAIL=website@affordablecarrentals.com.au
```

### Setting up Resend

1. Sign up at resend.com and add `affordablecarrentals.com.au` as a domain.
2. Add the DNS records it gives you — an MX record and two TXT records for
   DKIM and SPF.
3. Wait for verification, then create an API key.

**`CONTACT_FROM_EMAIL` must be on the verified domain.** Sending as a Gmail or
Outlook address will be rejected, and even if it weren't, it would fail SPF and
land in spam. The *reply-to* is set to the enquirer's address, so hitting reply
in the inbox writes back to the customer, not to the website.

### What the forms do

- **Validation** with zod, server-side. The browser's own validation is a
  convenience, not a control.
- **Honeypot** field positioned off-screen rather than `display:none`, because
  some bots skip hidden inputs. If it's filled, the action returns success
  without sending, so the bot doesn't retry.
- **Rate limit** of 5 submissions per IP per minute. It's in-memory and
  per-process, which means it resets on deploy and doesn't coordinate across
  instances. That's deliberate — it exists to blunt a script, not as real abuse
  protection. If the site ever runs more than one instance, move it to Redis or
  put Cloudflare in front.
- **The vehicle is carried in a hidden field** on car pages, and the email
  subject becomes `Enquiry — 2014 Toyota Camry Hybrid`. Without it every
  enquiry arrives saying "I'm interested in a car" and someone has to ring back
  to find out which one.

In development with no `RESEND_API_KEY`, submissions are logged to the console
and report success, so you can work on the forms without sending mail. In
production a missing key returns a visible error rather than silently
swallowing an enquiry.

---

## Design system

All in `src/app/globals.css`, mirroring the Avada stylesheet from the earlier
WordPress work so the two never drift.

| Token | Value | Use |
|---|---|---|
| `--brand` | `#000868` | Sampled from the logo. Nav bar, footer, dark bands. |
| `--ink` | `#0B1231` | Headings and body text |
| `--signal` | `#1E43D6` | Links and primary buttons |
| `--plate` | `#F2C438` | Prices only — the yellow rule under each rate |
| `--moss` | `#0F7A52` | Available / included |
| `--haze` | `#EEF0F7` | Alternating section background |

The logo navy is measured, not guessed: `#000868` is the single colour in
`logo.png`. Every foreground/background pairing in the table passes WCAG AA.

Plate yellow comes from the NSW registration plates visible in the client's own
car photographs. It appears under weekly prices and nowhere else — roughly five
percent coverage, which is what makes it a signature rather than a theme.

Type is Bricolage Grotesque for display and Inter for text, loaded through
`next/font/google` so they're self-hosted at build time. No runtime request to
Google, no layout shift.

### Logo files

| File | Use |
|---|---|
| `logo.png` | Nav bar, light backgrounds |
| `logo-white.png` | Footer — generated by recolouring the original, since navy on navy is invisible |
| `logo@2x.png`, `logo-white@2x.png` | Retina |

**Get a vector version from the client.** The supplied PNG is 312×202, which is
small for a retina nav bar; the @2x files are upscaled, not resampled from a
master. An SVG or the original AI/EPS would fix this properly and is worth one
email.

---

## Things left deliberately unfinished

- **`/privacy` is a placeholder.** It needs writing against the Australian
  Privacy Principles before launch. Don't publish as-is.
- **`/rental-terms` is a draft** assembled from what the client's own FAQ
  already commits to in public — $500 bond, 21 days, 25+, tolls plus $10,
  250km. It needs a lawyer.
- **Blog posts live in `src/lib/posts.ts`**, not the CMS. Two posts didn't
  justify a second schema. Moving them to Sanity later is a `post` document type
  and one query.
- **The homepage filter strip links to `/cars`** rather than filtering. Wire it
  to search params when the fleet is big enough to need it; at sixteen cars,
  scrolling is faster than filtering.

## Commands

```bash
npm run dev             # dev server
npm run build           # production build
npm start               # serve the build
npm run typecheck       # tsc --noEmit
npm run studio          # Sanity Studio locally on :3333
npm run studio:deploy   # publish the Studio
```
