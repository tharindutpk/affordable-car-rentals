import type { CategoryDef } from "@/lib/types";

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "rideshare",
    name: "Rideshare",
    h1: "Uber and Didi car rental in Sydney",
    title: "Uber & Didi car rental Sydney from $230/week",
    description:
      "Rent an Uber-approved car in Sydney from $230 a week. Insurance, rego and servicing included, unlimited kilometres, no credit check.",
    lede: "Every car on this page is approved for Uber and Didi, comprehensively insured, and comes with the insurance document you need to go online the same day you collect it.",
    cardBlurb:
      "Fuel-efficient hybrids and sedans approved for Uber and Didi. Insurance paperwork handed to you at pickup.",
    points: [
      "Uber and Didi approved, with paperwork handed to you at pickup",
      "Unlimited kilometres within 250km of the Sydney CBD",
      "Hybrids that run at roughly half the fuel cost of a petrol sedan",
      "Swap to a different car at no cost if it doesn't suit your shifts",
    ],
    body: [
      "The maths on rideshare is simple: the less you spend on fuel and the fewer kilometres you pay for, the more of each fare you keep. That's why most of our drivers end up in a hybrid. A Prius C or a Camry Hybrid will use around half the fuel of an equivalent petrol sedan over a full week of city driving, and because our kilometres are unlimited you never pay the 20c a kilometre that most rental companies charge once you pass their cap.",
      "You need to be 25 or over, hold a current Australian licence, and bring a Linkt account or e-tag for tolls. We don't check your credit.",
    ],
  },
  {
    slug: "uber-green",
    name: "Uber Green",
    h1: "Uber Green cars for hire in Sydney",
    title: "Uber Green hybrid rental Sydney from $230/week",
    description:
      "Hire a hybrid that qualifies for Uber Green trips in Sydney. From $230 a week with insurance, rego and servicing included.",
    lede: "Uber Green trips pay the same as UberX but go to drivers in hybrid or electric cars first. Every vehicle here qualifies you the moment you add it to your account.",
    cardBlurb:
      "Hybrid vehicles that qualify you for Uber Green trips on top of everything you already receive.",
    points: [
      "Qualifies for Uber Green as well as UberX, Comfort and Premier",
      "Hybrid drivetrains, roughly 4.5\u20135L/100km in city traffic",
      "Comprehensive insurance and rego included in the weekly rate",
      "No extra cost over our standard rideshare rates",
    ],
    body: [
      "Uber Green is part of Uber's move to a fully electric fleet by 2040. Riders request a hybrid or electric car instead of a petrol or diesel one, and they pay the same fare as UberX. For you it means an extra stream of trips on top of everything you're already eligible for \u2014 you don't lose UberX, Comfort or Premier work by switching.",
      "There's no application. Add a hybrid to your Uber account and the Green trips start coming through. Every car on this page qualifies.",
    ],
  },
  {
    slug: "uber-xl",
    name: "Uber XL & 7 seaters",
    h1: "UberXL and 7 seater hire in Sydney",
    title: "UberXL & 7 seater car hire Sydney from $300/week",
    description:
      "Seven seat wagons and people movers for UberXL drivers and larger families. From $300 a week, fully insured and maintained.",
    lede: "Bigger cars mean bigger fares. UberXL trips pay substantially more than UberX, and the same vehicle does the school run and the weekly shop on your days off.",
    cardBlurb:
      "Larger wagons and people movers for bigger fares, school runs and the weekly shop.",
    points: [
      "Seven seats, approved for UberXL fares",
      "Room for luggage \u2014 the trips other drivers have to decline",
      "Doubles as a family car when you're not driving",
      "Diesel and petrol options",
    ],
    body: [
      "Airport runs are where UberXL earns its keep. Four passengers with suitcases won't fit in a Camry, and those are exactly the trips that pay well and run long. A seven seater lets you take them.",
      "These cars also make sense for families who need the space and don't want a car loan. If that's you, look at the rent to own option \u2014 the weekly payments go towards owning it outright.",
    ],
  },
  {
    slug: "vans-utes",
    name: "Vans & utes",
    h1: "Van and ute hire for couriers and trades",
    title: "Courier van hire Sydney from $300/week",
    description:
      "One and two tonne vans for parcel delivery, removals and trade work. From $300 a week with unlimited kilometres.",
    lede: "One and two tonne vans for parcel delivery, removals and trade work. Unlimited kilometres, which matters more in a van than in anything else we rent.",
    cardBlurb:
      "One and two tonne vans for courier work, trades and moving jobs.",
    points: [
      "One tonne and two tonne vans available",
      "Unlimited kilometres \u2014 essential on delivery routes",
      "Serviced and maintained by us, so a breakdown isn't your problem",
      "Long-term rates for ongoing contracts",
    ],
    body: [
      "Courier and parcel work runs on kilometres. A delivery driver can clock 300km in a day, and at 20c a kilometre \u2014 what most rental companies charge past their cap \u2014 that's $60 a day gone before fuel. Our kilometres are unlimited within 250km of the CBD, so the weekly rate is the whole rate.",
      "If you're running a delivery contract, call us about a longer term. Rates come down when the booking does.",
    ],
  },
  {
    slug: "private-hire",
    name: "Private hire",
    h1: "Personal and family car hire in Sydney",
    title: "Weekly personal car hire Sydney from $230",
    description:
      "Weekly and monthly car hire for personal use in Sydney. A second family car or a replacement while yours is off the road.",
    lede: "A second car for the family, a replacement while yours is in the shop, or something to drive while you work out what to buy. Weekly, monthly, or as long as you need.",
    cardBlurb:
      "A second car for the family, or a replacement while yours is off the road. Weekly, monthly or longer.",
    points: [
      "No minimum term beyond the first week",
      "Comprehensive insurance and rego included",
      "Cheaper than daily hire once you pass a few days",
      "Swap vehicles if your needs change",
    ],
    body: [
      "Daily rental rates make sense for a weekend. They stop making sense somewhere around day four. If you need a car for a few weeks or a few months \u2014 a new job, a car that's off the road, family visiting from overseas \u2014 a weekly rate with servicing and insurance built in almost always works out cheaper.",
      "If your own car is being repaired after an accident that wasn't your fault, look at our insurance replacement page first. In most cases the hire costs you nothing at all.",
    ],
  },
];

export function getCategory(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug;
}
