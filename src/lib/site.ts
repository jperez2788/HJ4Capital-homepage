export const SITE = {
  name: "HJ4 Capital",
  shortName: "HJ4",
  tagline: "Building long-term value across Southeast real estate markets.",
  phone: "(347) 633-0180",
  phoneHref: "tel:+13476330180",
  address: "2330 Caravelle Cir, Kissimmee, FL 34746",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=2330+Caravelle+Cir+Kissimmee+FL+34746",
} as const;

export const NAV = [
  { label: "Approach", href: "/approach" },
  { label: "Markets", href: "/markets" },
  { label: "About", href: "/about" },
] as const;

export const FOCUS = [
  {
    n: "01",
    title: "Multifamily acquisitions",
    body: "Apartment communities in growing markets with durable rental demand, defensible locations, and a clear path to improve income.",
  },
  {
    n: "02",
    title: "Value-add opportunities",
    body: "Properties where renovations, operations, expense control, or repositioning can create meaningful upside over a hold period.",
  },
  {
    n: "03",
    title: "Market and deal analysis",
    body: "Every file is reviewed through rent comparables, occupancy, expenses, taxes, insurance, financing, and a realistic exit.",
  },
  {
    n: "04",
    title: "Due diligence",
    body: "Rent rolls, financials, physical condition, capital needs, local market data, and risk — before we move.",
  },
  {
    n: "05",
    title: "Capital and partnerships",
    body: "We work with brokers, owners, lenders, operators, and partners who want a direct, disciplined counterparty.",
  },
  {
    n: "06",
    title: "Long-term asset strategy",
    body: "Acquire quality assets, improve performance, and own with a multi-year mindset — not a flip calendar.",
  },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Source",
    body: "Off-market conversations, broker relationships, and targeted outreach in our core metros.",
  },
  {
    n: "02",
    title: "Screen",
    body: "Location, vintage, unit mix, and a first-pass on rent, occupancy, and basis against our criteria.",
  },
  {
    n: "03",
    title: "Underwrite",
    body: "Conservative assumptions. Taxes, insurance, and capex are not afterthoughts.",
  },
  {
    n: "04",
    title: "Diligence",
    body: "Physical, financial, legal, and market review. We walk the asset and the numbers.",
  },
  {
    n: "05",
    title: "Structure",
    body: "Financing, partnership, and business plan aligned to the hold — not the pitch deck.",
  },
  {
    n: "06",
    title: "Own",
    body: "Execute the plan, watch the operations, and manage the asset as long-term capital.",
  },
] as const;

export const MARKETS = [
  {
    region: "Core",
    state: "Florida",
    metros: [
      "Orlando",
      "Tampa Bay",
      "Jacksonville",
      "South Florida",
      "Fort Lauderdale",
      "Miami-Dade",
      "Broward County",
    ],
  },
  {
    region: "Core",
    state: "Georgia",
    metros: ["Atlanta", "Savannah"],
  },
  {
    region: "Core",
    state: "North Carolina",
    metros: ["Charlotte", "Raleigh-Durham"],
  },
  {
    region: "Core",
    state: "South Carolina",
    metros: ["Greenville-Spartanburg", "Charleston"],
  },
  {
    region: "Core",
    state: "Texas",
    metros: ["Dallas–Fort Worth", "Houston", "Austin", "San Antonio"],
  },
  {
    region: "Select",
    state: "Tennessee",
    metros: ["Nashville", "Knoxville", "Chattanooga"],
  },
  {
    region: "Select",
    state: "Alabama",
    metros: ["Huntsville", "Birmingham"],
  },
] as const;

export const TICKER = [
  "Orlando",
  "Tampa Bay",
  "Jacksonville",
  "South Florida",
  "Atlanta",
  "Savannah",
  "Charlotte",
  "Raleigh-Durham",
  "Charleston",
  "Greenville",
  "Dallas–Fort Worth",
  "Houston",
  "Austin",
  "San Antonio",
  "Nashville",
  "Knoxville",
  "Huntsville",
] as const;

export const ROLES = [
  "Broker",
  "Property owner",
  "Lender",
  "Operator",
  "Potential partner",
  "Other",
] as const;

export const FAQS = [
  {
    q: "What does HJ4 Capital focus on?",
    a: "Multifamily and income-producing real estate across Florida, Georgia, the Carolinas, Texas, and select Southeast markets. We look for strong fundamentals, durable rental demand, and a path to long-term value.",
  },
  {
    q: "What types of properties do you evaluate?",
    a: "Primarily multifamily apartment communities, value-add residential, and select income-producing assets — places where operations, renovations, expense control, or repositioning can create additional value.",
  },
  {
    q: "What markets do you cover?",
    a: "Core focus is Florida, Georgia, North Carolina, South Carolina, and Texas. We also review select opportunities in Tennessee, Alabama, and other Sun Belt markets when the fundamentals hold.",
  },
  {
    q: "How do you evaluate a deal?",
    a: "Disciplined underwriting and diligence: rent rolls, financials, property condition, local market data, taxes, insurance, financing, capital needs, and exit strategy.",
  },
  {
    q: "Are you currently acquiring?",
    a: "Yes. We are actively reviewing acquisition opportunities and building relationships with brokers, owners, lenders, operators, and partners across our target markets.",
  },
  {
    q: "Can brokers or owners submit opportunities?",
    a: "Yes. Send property details, location, financials, and offering information through the form, or call us directly.",
  },
  {
    q: "Are you part of a larger investor network?",
    a: "We participate in the Grant Cardone Real Estate Club for education, investor conversations, market insight, and network. HJ4 Capital remains an independent investment group. Participation does not imply endorsement, sponsorship, partnership, or affiliation with Grant Cardone, Cardone Capital, or related entities.",
  },
  {
    q: "Do you guarantee returns?",
    a: "No. Real estate involves risk. HJ4 Capital does not guarantee returns or outcomes. Each opportunity is evaluated on its own facts, risks, market fundamentals, financing, and business plan.",
  },
] as const;

export const DISCLAIMER =
  "HJ4 Capital is an independent real estate investment group. Participation in the Grant Cardone Real Estate Club does not imply endorsement, sponsorship, partnership, or affiliation with Grant Cardone, Cardone Capital, or any related entities. Nothing on this website should be interpreted as an offer to sell securities, a solicitation of an offer to buy securities, or a guarantee of investment performance.";
