export interface Post {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  description: string;
  lede: string;
  /** Simple block list so we don't need a rich-text renderer for two posts. */
  blocks: (
    | { t: "h2"; v: string }
    | { t: "p"; v: string }
    | { t: "pull"; v: string }
    | { t: "ul"; v: string[] }
  )[];
  cta: { href: string; label: string }[];
}

export const POSTS: Post[] = [
  {
    slug: "benefits-of-uber-green",
    title: "The benefits of Uber Green",
    category: "Rideshare",
    excerpt:
      "Uber Green trips pay the same as UberX but go to hybrid and electric drivers first. What it is, where it runs, and how to become eligible without applying for anything.",
    description:
      "What Uber Green is, where it operates in Australia, how much the trips pay and how to become eligible as a driver.",
    lede: "Uber has committed to a fully electric fleet by 2040. Uber Green is the part of that you can act on this week.",
    blocks: [
      { t: "p", v: "Uber Green launched in Australia in June 2023. It lets passengers request a ride in an electric or hybrid vehicle, currently for the same price as an UberX trip. For drivers, it's an extra source of work that costs nothing to access." },
      { t: "h2", v: "What is Uber Green?" },
      { t: "p", v: "It's an option inside the Uber passenger app. Riders choose a hybrid or electric car instead of a petrol or diesel one, at no extra cost to them, to help keep city air cleaner." },
      { t: "h2", v: "Where does it operate?" },
      { t: "p", v: "Sydney, Melbourne, Brisbane, the Gold Coast, Perth, Adelaide and Canberra." },
      { t: "h2", v: "What do the trips pay?" },
      { t: "p", v: "The same fare as UberX. There's no additional charge to the rider and no reduction to you." },
      { t: "h2", v: "How do I become eligible?" },
      { t: "p", v: "Your car needs to be a petrol hybrid, plug-in hybrid, or fully electric. That's the entire requirement. If you're already driving a hybrid or EV for Uber, you're eligible now — there's no form to fill in and nothing to apply for." },
      { t: "pull", v: "Add a hybrid to your Uber account and the Green trips start arriving. That's the whole process." },
      { t: "h2", v: "Do I lose UberX trips?" },
      { t: "p", v: "No. Green trips come in addition to UberX and every other ride type you're already eligible for, including Comfort and Premier." },
      { t: "h2", v: "Why it's worth switching" },
      { t: "p", v: "Two reasons. Riders get access to lower-emission transport, and you get an advantage over every driver still in a petrol or diesel car — more trip types, for the same fares." },
      { t: "p", v: "The fuel saving is the part drivers notice first. A hybrid in Sydney traffic will use roughly half what an equivalent petrol sedan does. Over a full week of driving, that difference is real money." },
      { t: "h2", v: "How we can help" },
      { t: "p", v: "We rent a range of hybrids, from the compact Prius C up to the Camry Hybrid. Every one of them qualifies you for Uber Green, and the weekly rate includes comprehensive insurance, registration and servicing." },
    ],
    cta: [{ href: "/rent/uber-green", label: "See our Uber Green cars" }],
  },
  {
    slug: "rent-to-own-a-car-for-uber",
    title: "How to rent to own a car for Uber",
    category: "Rent to own",
    excerpt:
      "Whether to buy, rent to own, or use the car you already have. The costs, the credit question, and what drivers actually earn in Sydney.",
    description:
      "Buy, rent to own, or use your own car? A guide to the costs, the credit question and what Uber drivers really earn in Sydney.",
    lede: "Getting your first rideshare car is harder than it should be. Here are the answers we give most often.",
    blocks: [
      { t: "p", v: "If you're already driving, you'll remember the hours of searching that ended with two websites saying opposite things. If you're just starting, this should save you some of that." },
      { t: "h2", v: "Can I drive Uber with a rent to own car?" },
      { t: "p", v: "Yes, and it's become common. The appeal is the flexible arrangement with no deposit-sized loan and no credit check behind it." },
      { t: "h2", v: "What does it cost?" },
      { t: "p", v: "More than just the weekly rate, and anyone who tells you otherwise is leaving something out. With us it's $1,000 down plus the first week. After that you're covering the weekly payment, insurance, registration, servicing, fuel and tolls. We price all of those out with you before you sign, because the weekly figure on its own is not the real cost." },
      { t: "h2", v: "Is it worth it compared to buying?" },
      { t: "p", v: "Depends on your situation. There are three options and each suits someone different." },
      { t: "ul", v: [
        "Buying makes sense if you intend to drive for years, or the car would still be a reasonable purchase after a career change. If you're driving for the flexibility, putting your savings into a deposit and locking into a long contract works against the reason you started.",
        "Rent to own suits people in between jobs, or not yet certain rideshare is for them. You're building towards ownership without a loan.",
        "Using your own car works if it's relatively new with a five-star ANCAP rating, and you accept the wear and the maintenance. Uber has only signed up five-star-rated cars since October 2019.",
      ] },
      { t: "h2", v: "Can I get a car with bad credit?" },
      { t: "p", v: "Yes. You're not applying for a loan, so your credit score isn't part of the assessment. You pay in advance rather than repaying a debt. If you want to own a car eventually and a lender won't have you, this is the route that stays open." },
      { t: "pull", v: "Roughly fifteen hours of driving covers a weekly rent to own payment." },
      { t: "h2", v: "Which car is best for Uber?" },
      { t: "p", v: "Passenger comfort and luggage space come first, fuel economy a very close second. The Toyota Camry Hybrid is the most popular car we rent for rideshare, for both of those reasons." },
      { t: "h2", v: "What can I earn?" },
      { t: "p", v: "It depends on the city, the hours, the areas you work and your strategy. Our customers report that a full-time driver in Sydney or Melbourne can earn $1,500 to $2,000 a week. The real advantage is choosing your own hours." },
    ],
    cta: [
      { href: "/rent-to-own", label: "See how rent to own works" },
      { href: "/rent/rideshare", label: "Browse rideshare cars" },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
