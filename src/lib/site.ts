export const site = {
  name: "Affordable Car Rentals",
  phone: "0422 571 499",
  phoneHref: "tel:+61422571499",
  email: process.env.CONTACT_TO_EMAIL || "info@affordablecarrentals.com.au",
  abn: "49 693 697 059",
  address: {
    street: "1139 Victoria Rd",
    suburb: "West Ryde",
    state: "NSW",
    postcode: "2114",
    country: "Australia",
  },
  addressLine: "1139 Victoria Rd, West Ryde NSW 2114",
  hours: [
    ["Monday to Friday", "9:00am \u2013 5:00pm"],
    ["Saturday", "By appointment"],
    ["Sunday", "By appointment"],
  ] as const,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.affordablecarrentals.com.au",
};

export const INCLUDED = [
  "Unlimited kilometres",
  "Comprehensive insurance",
  "Registration and CTP",
  "Scheduled servicing",
  "Repairs and maintenance",
  "Free swap if it's not right",
  "Uber insurance documents",
  "No credit check",
];

export const STEPS = [
  {
    title: "Pick your car",
    body: "Browse the fleet by what you're driving for, how many seats you need and your weekly budget. Send an enquiry on the one you want, or call and we'll talk it through.",
  },
  {
    title: "Hold it with $100",
    body: "A $100 holding deposit takes the car off the market and comes straight off your bond. We'll email you the details to finish your rental profile. No financial history needed.",
  },
  {
    title: "Collect from West Ryde",
    body: "Bring your licence, your Linkt or e-tag, the balance of the $500 bond and your first week's rent. We'll walk you through the car and you're driving the same day.",
  },
];

export const PURPOSES = [
  "Rideshare (Uber, Didi)",
  "Food or parcel delivery",
  "Personal use",
  "Family / 7 seats",
  "Work van or ute",
  "Rent to own",
  "Insurance replacement",
];

export const AVAILABILITY_LABEL: Record<string, string> = {
  available: "Available now",
  "on-hire": "Currently on hire",
  "coming-soon": "Coming soon",
};
