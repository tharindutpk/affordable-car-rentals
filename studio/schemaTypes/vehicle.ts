import { defineField, defineType } from "sanity";

export const CATEGORY_OPTIONS = [
  { title: "Rideshare (Uber, Didi)", value: "rideshare" },
  { title: "Uber Green", value: "uber-green" },
  { title: "Uber XL & 7 seaters", value: "uber-xl" },
  { title: "Vans & utes", value: "vans-utes" },
  { title: "Private hire", value: "private-hire" },
];

export default defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  groups: [
    { name: "main", title: "The car", default: true },
    { name: "specs", title: "Specs" },
    { name: "photos", title: "Photos" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Make and model",
      type: "string",
      group: "main",
      description: 'Just the name, no year. e.g. "Toyota Camry Hybrid"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      group: "main",
      options: {
        source: (doc: Record<string, unknown>) =>
          `${doc.year ?? ""} ${doc.title ?? ""}`.trim(),
        maxLength: 90,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "main",
      validation: (r) => r.required().min(1990).max(2100),
    }),
    defineField({
      name: "weeklyRate",
      title: "Weekly rate ($)",
      type: "number",
      group: "main",
      description: "Just the number. The $ and /week are added by the site.",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "Available now", value: "available" },
          { title: "On hire", value: "on-hire" },
          { title: "Coming soon", value: "coming-soon" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      title: "Suits",
      type: "array",
      group: "main",
      of: [{ type: "string" }],
      options: { list: CATEGORY_OPTIONS },
      description: "Tick every one that applies. A Camry Hybrid is both Rideshare and Uber Green.",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "rentToOwn",
      title: "Available on rent to own",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "note",
      title: "What is this car good at?",
      type: "text",
      rows: 3,
      group: "main",
      description:
        'One or two sentences in plain language. "Around 4.5L/100km in Sydney traffic" does more work than any spec row.',
    }),

    defineField({ name: "seats", title: "Seats", type: "number", group: "specs",
      validation: (r) => r.required().min(1).max(20) }),
    defineField({ name: "fuel", title: "Fuel", type: "string", group: "specs",
      options: { list: ["Hybrid", "Petrol", "Diesel", "Electric"] },
      validation: (r) => r.required() }),
    defineField({ name: "transmission", title: "Transmission", type: "string", group: "specs",
      options: { list: ["Automatic", "Manual"] }, initialValue: "Automatic",
      validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "string", group: "specs",
      options: { list: ["Hatchback", "Sedan", "Wagon", "Van", "Ute", "People mover"] },
      validation: (r) => r.required() }),

    defineField({
      name: "mainImage",
      title: "Main photo",
      type: "image",
      group: "photos",
      options: { hotspot: true },
      description: "Landscape, 3:2. Three-quarter front angle, same spot every time.",
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string",
          description: "Describe the car for screen readers and Google." }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "More photos",
      type: "array",
      group: "photos",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
    }),
  ],
  orderings: [
    { title: "Price, low to high", name: "rateAsc", by: [{ field: "weeklyRate", direction: "asc" }] },
    { title: "Newest car first", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", year: "year", rate: "weeklyRate",
              media: "mainImage", availability: "availability" },
    prepare({ title, year, rate, media, availability }) {
      const flag = availability === "available" ? "" : "  \u00b7 on hire";
      return { title: `${year} ${title}`, subtitle: `$${rate}/week${flag}`, media };
    },
  },
});
