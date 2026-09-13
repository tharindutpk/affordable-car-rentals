/**
 * GROQ queries. Plain template strings — GROQ is just text, and avoiding the
 * `groq` tag keeps one more package out of the tree. Editors with the Sanity
 * extension will still highlight these if you add the /* groq *\/ comment tag.
 */

const FIELDS = `
  _id,
  title,
  "slug": slug.current,
  year,
  weeklyRate,
  availability,
  categories,
  rentToOwn,
  note,
  seats,
  fuel,
  transmission,
  body,
  mainImage,
  gallery
`;

/** Available cars first, then cheapest first inside each group. */
export const ALL_VEHICLES = `
  *[_type == "vehicle"] | order(
    select(availability == "available" => 0, 1) asc,
    weeklyRate asc
  ) { ${FIELDS} }
`;

export const VEHICLES_BY_CATEGORY = `
  *[_type == "vehicle" && $category in categories] | order(
    select(availability == "available" => 0, 1) asc,
    weeklyRate asc
  ) { ${FIELDS} }
`;

export const VEHICLE_BY_SLUG = `
  *[_type == "vehicle" && slug.current == $slug][0] { ${FIELDS} }
`;

export const VEHICLE_SLUGS = `
  *[_type == "vehicle" && defined(slug.current)][].slug.current
`;

export const RENT_TO_OWN_VEHICLES = `
  *[_type == "vehicle" && rentToOwn == true] | order(weeklyRate asc) { ${FIELDS} }
`;
