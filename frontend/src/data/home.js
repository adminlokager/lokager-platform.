// LOKAGER — Module 1 homepage demo/mock data.
// NOTE: This is clearly-separated frontend demo data ONLY. Values are illustrative
// and must NOT be represented as verified live market data. Replace with APIs later.
//
// Data principle: PROPERTY != LISTING. A property is the persistent real-world asset;
// a listing is a temporary marketing event on that property. Mock records below keep
// the property identity separate from its current listing event so future APIs can
// attach multiple listings, price history and provider relationships to one property.

const px = (url, w = 1200) => `${url}&w=${w}`;

// Guaranteed-good fallback if a remote image fails to load.
export const IMG_FALLBACK = px("https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80", 1000);
export const onImgError = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMG_FALLBACK; };

// ---- Hero -------------------------------------------------------------------
export const HERO_IMAGE = px(
  "https://images.unsplash.com/photo-1773470920361-4f6cbb702ce0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80",
  1400,
);

export const SEARCH_TABS = ["Buy", "Rent", "New Projects", "Commercial", "Land"];

export const PROPERTY_TYPES = [
  "Apartment",
  "Independent House",
  "Villa",
  "Plot / Land",
  "Office Space",
  "Retail / Shop",
  "Warehouse",
];

export const BUDGET_RANGES = [
  "Under ₹50 Lakh",
  "₹50 Lakh – ₹1 Cr",
  "₹1 Cr – ₹2 Cr",
  "₹2 Cr – ₹5 Cr",
  "₹5 Cr – ₹10 Cr",
  "Above ₹10 Cr",
];

// ---- Trust pillars ----------------------------------------------------------
export const TRUST_PILLARS = [
  {
    id: "information",
    icon: "FileText",
    title: "Better Property Information",
    body: "Clearer, well-structured information designed to help you truly understand what you are exploring.",
  },
  {
    id: "comparison",
    icon: "Scale",
    title: "Smarter Comparisons",
    body: "Compare properties, locations, features and value side by side, more easily and confidently.",
  },
  {
    id: "freshness",
    icon: "RefreshCw",
    title: "Fresher Listings",
    body: "An architecture built for better listing status and freshness, so what you see stays relevant.",
  },
  {
    id: "connections",
    icon: "Handshake",
    title: "Trusted Connections",
    body: "A cleaner way for property seekers and property providers to find and connect with each other.",
  },
];

// ---- Ad showcase (demo campaign, dual desktop/mobile creatives) -------------
// Data model mirrors a future backend-controlled campaign record. Module 1 uses
// demo creatives only; no backend/DB. Video never autoplays with sound.
export const AD_CAMPAIGN = {
  campaignId: "demo-001",
  active: true,
  priority: 1,
  advertiserName: "Meridian Developers",
  campaignTitle: "The Grove Residences — Whitefield, Bengaluru",
  campaignCopy: "Limited collection of 3 & 4 BHK sky homes overlooking 6 acres of landscaped green.",
  ctaText: "View Campaign",
  ctaHref: "#",
  startDate: "2026-06-01",
  endDate: "2026-12-31",
  disclosure: "Advertisement",
  // Desktop creative (~2.3:1)
  desktopImage: px("https://images.unsplash.com/photo-1773470920361-4f6cbb702ce0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 1760),
  desktopPoster: px("https://images.unsplash.com/photo-1773470920361-4f6cbb702ce0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 1760),
  desktopVideo: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  // Mobile creative (~16:11) — distinct asset, not a crop of the desktop one
  mobileImage: px("https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80", 900),
  mobilePoster: px("https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80", 900),
  mobileVideo: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
};

// Resolve the correct creative variant for the current viewport (mobile falls
// back to desktop assets when a mobile-specific asset is not provided).
export const resolveAdCreative = (campaign, isMobile) => {
  if (isMobile) {
    return {
      image: campaign.mobileImage || campaign.desktopImage,
      poster: campaign.mobilePoster || campaign.desktopPoster || campaign.mobileImage,
      video: campaign.mobileVideo || campaign.desktopVideo,
    };
  }
  return { image: campaign.desktopImage, poster: campaign.desktopPoster || campaign.desktopImage, video: campaign.desktopVideo };
};

// ---- Explore categories -----------------------------------------------------
export const CATEGORIES = [
  {
    id: "buy",
    title: "Buy a Home",
    note: "Apartments, houses & villas",
    image: px("https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80", 900),
  },
  {
    id: "rent",
    title: "Rent a Home",
    note: "Flexible living, ready to move",
    image: px("https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8fHwxNzg5MzY0NjI2fDA&ixlib=rb-4.1.0&q=80", 900),
  },
  {
    id: "new-projects",
    title: "New Projects",
    note: "Fresh launches by developers",
    image: px("https://images.unsplash.com/photo-1773470920361-4f6cbb702ce0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 900),
  },
  {
    id: "commercial",
    title: "Commercial Property",
    note: "Offices, retail & workspaces",
    image: px("https://images.unsplash.com/photo-1554469384-e58fac16e23a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 900),
  },
  {
    id: "land",
    title: "Land & Plots",
    note: "Residential & farm plots",
    image: px("https://images.unsplash.com/photo-1600078216861-d0190aab7506?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxncmVlbiUyMGxhbmQlMjBwbG90JTIwYWVyaWFsJTIwdmlld3xlbnwwfHx8fDE3ODkzNjQ2MjZ8MA&ixlib=rb-4.1.0&q=80", 900),
  },
  {
    id: "mortgage",
    title: "Mortgage",
    note: "Home loans & affordability",
    image: px("https://images.unsplash.com/photo-1629946488804-217c002178cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBhcmNoaXRlY3R1cmFsJTIwdmlsbGElMjBtb2Rlcm4lMjBpbmRpYW4lMjBob21lJTIwaW50ZXJpb3IlMjBleHRlcmlvcnxlbnwwfHx8fDE3ODkzNjQ1NzZ8MA&ixlib=rb-4.1.0&q=80", 900),
  },
];

// ---- Featured properties (property identity separate from listing event) ----
export const PROPERTIES = [
  {
    propertyId: "PR-1001",
    title: "4 BHK Garden Villa",
    locality: "Whitefield",
    city: "Bengaluru",
    price: "₹4.2 Cr",
    propertyType: "Villa",
    bedrooms: 4,
    area: "3,650 sq.ft",
    providerType: "Owner",
    listing: { listingId: "LS-88121", status: "New listing", freshness: "Added 1 day ago" },
    image: px("https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80", 800),
  },
  {
    propertyId: "PR-1002",
    title: "3 BHK Sky Apartment",
    locality: "Lower Parel",
    city: "Mumbai",
    price: "₹6.8 Cr",
    propertyType: "Apartment",
    bedrooms: 3,
    area: "1,940 sq.ft",
    providerType: "Broker",
    listing: { listingId: "LS-88122", status: "Active", freshness: "Updated 3 days ago" },
    image: px("https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80", 800),
  },
  {
    propertyId: "PR-1003",
    title: "Contemporary 5 BHK House",
    locality: "Jubilee Hills",
    city: "Hyderabad",
    price: "₹8.5 Cr",
    propertyType: "Independent House",
    bedrooms: 5,
    area: "5,200 sq.ft",
    providerType: "Owner",
    listing: { listingId: "LS-88123", status: "Active", freshness: "Updated 5 days ago" },
    image: px("https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80", 800),
  },
  {
    propertyId: "PR-1004",
    title: "3 BHK Residence with Park View",
    locality: "Sector 150",
    city: "Noida",
    price: "₹2.1 Cr",
    propertyType: "Apartment",
    bedrooms: 3,
    area: "2,100 sq.ft",
    providerType: "Developer",
    listing: { listingId: "LS-88124", status: "New listing", freshness: "Added 2 days ago" },
    image: px("https://images.unsplash.com/photo-1773470920361-4f6cbb702ce0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 800),
  },
  {
    propertyId: "PR-1005",
    title: "Premium Office Floor",
    locality: "Cyber City",
    city: "Gurugram",
    price: "₹12.0 Cr",
    propertyType: "Office Space",
    bedrooms: 0,
    area: "8,400 sq.ft",
    providerType: "Broker",
    listing: { listingId: "LS-88125", status: "Active", freshness: "Updated 1 week ago" },
    image: px("https://images.unsplash.com/photo-1554469384-e58fac16e23a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 800),
  },
  {
    propertyId: "PR-1006",
    title: "Residential Plot — Gated Layout",
    locality: "Devanahalli",
    city: "Bengaluru",
    price: "₹1.4 Cr",
    propertyType: "Plot / Land",
    bedrooms: 0,
    area: "2,400 sq.ft",
    providerType: "Owner",
    listing: { listingId: "LS-88126", status: "Active", freshness: "Updated 4 days ago" },
    image: px("https://images.unsplash.com/photo-1600078216861-d0190aab7506?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxncmVlbiUyMGxhbmQlMjBwbG90JTIwYWVyaWFsJTIwdmlld3xlbnwwfHx8fDE3ODkzNjQ2MjZ8MA&ixlib=rb-4.1.0&q=80", 800),
  },
];

// ---- New projects -----------------------------------------------------------
export const PROJECTS = [
  {
    id: "NP-501",
    name: "Aurelia Skypark",
    developer: "Meridian Developers",
    location: "Whitefield, Bengaluru",
    startingPrice: "₹1.8 Cr onwards",
    configuration: "2, 3 & 4 BHK",
    status: "New Launch",
    image: px("https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 900),
  },
  {
    id: "NP-502",
    name: "The Grove Residences",
    developer: "Northstar Estates",
    location: "Sector 150, Noida",
    startingPrice: "₹95 Lakh onwards",
    configuration: "2 & 3 BHK",
    status: "Under Construction",
    image: px("https://images.unsplash.com/photo-1773470920361-4f6cbb702ce0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 900),
  },
  {
    id: "NP-503",
    name: "Meridian One",
    developer: "Kestrel Group",
    location: "Cyber City, Gurugram",
    startingPrice: "₹3.2 Cr onwards",
    configuration: "3 & 4 BHK",
    status: "Ready to Move",
    image: px("https://images.unsplash.com/photo-1621831337128-35676ca30868?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 900),
  },
];

// ---- Locality intelligence (sample data, not live market data) --------------
export const LOCALITIES = [
  {
    id: "LOC-1",
    name: "Whitefield",
    city: "Bengaluru",
    avgPrice: "₹9,800 / sq.ft",
    connectivity: "Metro Purple Line, ORR",
    schools: "18+ schools nearby",
    hospitals: "9 hospitals within 5 km",
    businessHubs: "ITPL, EPIP tech parks",
    lifestyle: "Malls, cafes, green belts",
    infrastructure: "Metro extension underway",
    image: px("https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 800),
  },
  {
    id: "LOC-2",
    name: "Lower Parel",
    city: "Mumbai",
    avgPrice: "₹38,500 / sq.ft",
    connectivity: "Western & Central lines",
    schools: "12+ schools nearby",
    hospitals: "7 hospitals within 5 km",
    businessHubs: "Financial & media district",
    lifestyle: "High streets, dining, arts",
    infrastructure: "Coastal road connectivity",
    image: px("https://images.unsplash.com/photo-1666843527155-14ec5f016802?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxtdW1iYWklMjBjaXR5JTIwc2t5bGluZSUyMGR1c2t8ZW58MHx8fHwxNzg5MzY0NjI2fDA&ixlib=rb-4.1.0&q=80", 800),
  },
  {
    id: "LOC-3",
    name: "Cyber City",
    city: "Gurugram",
    avgPrice: "₹16,200 / sq.ft",
    connectivity: "Rapid Metro, NH-48",
    schools: "10+ schools nearby",
    hospitals: "6 hospitals within 5 km",
    businessHubs: "Fortune 500 offices",
    lifestyle: "Fine dining, retail towers",
    infrastructure: "Expressway upgrades",
    image: px("https://images.unsplash.com/photo-1554469384-e58fac16e23a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80", 800),
  },
];

// ---- Property intelligence (flagship tech, not yet available) ---------------
export const INTELLIGENCE = [
  { id: "compare", icon: "GitCompareArrows", title: "Property Comparison", body: "Weigh two properties across price, size, features and locality in one clean view.", tag: "Coming Soon" },
  { id: "history", icon: "LineChart", title: "Price History", body: "Understand how a property's asking price has moved over time.", tag: "Being built for LOKAGER" },
  { id: "locality", icon: "Map", title: "Locality Intelligence", body: "Deep neighbourhood context — connectivity, amenities and infrastructure.", tag: "Coming Soon" },
  { id: "freshness", icon: "Activity", title: "Property Freshness", body: "Signals that help you focus on listings that are current and relevant.", tag: "Coming Soon" },
  { id: "affordability", icon: "Wallet", title: "Affordability Insights", body: "See what a property could mean for your budget and monthly outlook.", tag: "Being built for LOKAGER" },
  { id: "passport", icon: "BadgeCheck", title: "Property Passport", body: "A persistent record of a property's story — beyond a single listing.", tag: "Being built for LOKAGER" },
];

// ---- LOKAGER Services (future ecosystem, coming soon) -----------------------
export const SERVICES = [
  { id: "painting", icon: "PaintRoller", label: "Painting" },
  { id: "interiors", icon: "Sofa", label: "Interiors" },
  { id: "electrical", icon: "Plug", label: "Electrical" },
  { id: "plumbing", icon: "Droplets", label: "Plumbing" },
  { id: "carpentry", icon: "Hammer", label: "Carpentry" },
  { id: "civil", icon: "Building2", label: "Civil Work" },
  { id: "waterproofing", icon: "ShieldCheck", label: "Waterproofing" },
  { id: "flooring", icon: "Grid3x3", label: "Flooring" },
  { id: "fabrication", icon: "Wrench", label: "Fabrication" },
  { id: "cleaning", icon: "Sparkles", label: "Cleaning" },
  { id: "moving", icon: "Truck", label: "Moving" },
  { id: "maintenance", icon: "Settings", label: "Property Maintenance" },
];

// ---- List / Sell property ---------------------------------------------------
export const LIST_TYPES = [
  { id: "owner", icon: "Home", title: "Owner", body: "List your own property and connect with genuine seekers directly." },
  { id: "broker", icon: "Briefcase", title: "Broker", body: "Bring your portfolio to a cleaner, more organised platform." },
  { id: "developer", icon: "Building2", title: "Developer", body: "Showcase new projects to a focused, intent-driven audience." },
];

// ---- Footer -----------------------------------------------------------------
export const FOOTER_LINKS = {
  Explore: ["Buy", "Rent", "New Projects", "Commercial", "Land", "Mortgage"],
  Company: ["About LOKAGER", "LOKAGER Services", "List Property", "Contact", "Careers"],
  Legal: ["Privacy Policy", "Terms & Conditions", "Disclaimer", "RERA Information"],
};
