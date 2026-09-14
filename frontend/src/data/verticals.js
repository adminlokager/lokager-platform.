import { PROPERTIES as RAW_FEATURED } from "@/data/home";

const px = (url, w = 900) => `${url}&w=${w}`;

// Validated image pool (reused across demo datasets).
const IMG = {
  villa: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHw0fHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80",
  pool: "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80",
  house: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTF8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwbW9kZXJuJTIwdmlsbGElMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc4OTM2NDYyMHww&ixlib=rb-4.1.0&q=80",
  apt: "https://images.unsplash.com/photo-1773470920361-4f6cbb702ce0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbmRpYW4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80",
  living: "https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8fHwxNzg5MzY0NjI2fDA&ixlib=rb-4.1.0&q=80",
  living2: "https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8fHwxNzg5MzY0NjI2fDA&ixlib=rb-4.1.0&q=80",
  office: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80",
  office2: "https://images.unsplash.com/photo-1621831337128-35676ca30868?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZXxlbnwwfHx8fDE3ODkzNjQ2MjB8MA&ixlib=rb-4.1.0&q=80",
  land: "https://images.unsplash.com/photo-1600078216861-d0190aab7506?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxncmVlbiUyMGxhbmQlMjBwbG90JTIwYWVyaWFsJTIwdmlld3xlbnwwfHx8fDE3ODkzNjQ2MjZ8MA&ixlib=rb-4.1.0&q=80",
  land2: "https://images.unsplash.com/photo-1630672140970-290903ff233c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxhbmQlMjBwbG90JTIwYWVyaWFsJTIwdmlld3xlbnwwfHx8fDE3ODkzNjQ2MjZ8MA&ixlib=rb-4.1.0&q=80",
  city: "https://images.unsplash.com/photo-1666843527155-14ec5f016802?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxtdW1iYWklMjBjaXR5JTIwc2t5bGluZSUyMGR1c2t8ZW58MHx8fHwxNzg5MzY0NjI2fDA&ixlib=rb-4.1.0&q=80",
};

const AMENITIES = ["Covered Parking", "24x7 Security", "Power Backup", "Clubhouse", "Landscaped Garden", "Gymnasium", "Lift", "Rainwater Harvesting"];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Normalises a property record: derives slug, gallery, amenities, description.
const build = (p) => {
  const gallery = p.gallery || [px(p.image, 1200), px(p.g2 || IMG.living, 1200), px(p.g3 || IMG.apt, 1200), px(p.g4 || IMG.villa, 1200)];
  return {
    category: p.category || "buy",
    amenities: p.amenities || AMENITIES.slice(0, 6),
    description:
      p.description ||
      `A well-appointed ${p.propertyType?.toLowerCase() || "property"} in ${p.locality}, ${p.city}. Thoughtfully laid out with quality finishes and easy access to key neighbourhood conveniences. Illustrative demo listing.`,
    ...p,
    image: px(p.image, 800),
    gallery,
    slug: `${slugify(p.title)}-${p.propertyId.toLowerCase()}`,
  };
};

// ---- Featured (from homepage), enriched for detail pages --------------------
export const FEATURED = RAW_FEATURED.map((p) => build({ ...p, category: p.category || "buy" }));

// ---- Buy ---------------------------------------------------------------------
export const BUY_PROPERTIES = [
  { propertyId: "PB-201", title: "4 BHK Garden Villa", locality: "Whitefield", city: "Bengaluru", price: "₹4.2 Cr", propertyType: "Villa", bedrooms: 4, area: "3,650 sq.ft", providerType: "Owner", possession: "Ready to move", listing: { status: "New listing", freshness: "Added 1 day ago" }, image: IMG.villa, g2: IMG.living, g3: IMG.pool },
  { propertyId: "PB-202", title: "3 BHK Sky Apartment", locality: "Lower Parel", city: "Mumbai", price: "₹6.8 Cr", propertyType: "Apartment", bedrooms: 3, area: "1,940 sq.ft", providerType: "Broker", possession: "Ready to move", listing: { status: "Active", freshness: "Updated 3 days ago" }, image: IMG.pool, g2: IMG.living2, g3: IMG.apt },
  { propertyId: "PB-203", title: "5 BHK Contemporary House", locality: "Jubilee Hills", city: "Hyderabad", price: "₹8.5 Cr", propertyType: "Independent House", bedrooms: 5, area: "5,200 sq.ft", providerType: "Owner", possession: "Ready to move", listing: { status: "Active", freshness: "Updated 5 days ago" }, image: IMG.house, g2: IMG.living, g3: IMG.villa },
  { propertyId: "PB-204", title: "3 BHK Residence, Park View", locality: "Sector 150", city: "Noida", price: "₹2.1 Cr", propertyType: "Apartment", bedrooms: 3, area: "2,100 sq.ft", providerType: "Developer", possession: "New construction", listing: { status: "New listing", freshness: "Added 2 days ago" }, image: IMG.apt, g2: IMG.living2, g3: IMG.pool },
  { propertyId: "PB-205", title: "2 BHK Smart Apartment", locality: "Hinjewadi", city: "Pune", price: "₹98 Lakh", propertyType: "Apartment", bedrooms: 2, area: "1,180 sq.ft", providerType: "Developer", possession: "New construction", listing: { status: "Active", freshness: "Updated 2 days ago" }, image: IMG.living, g2: IMG.apt, g3: IMG.living2 },
  { propertyId: "PB-206", title: "4 BHK Lake-facing Villa", locality: "Kokapet", city: "Hyderabad", price: "₹5.4 Cr", propertyType: "Villa", bedrooms: 4, area: "4,100 sq.ft", providerType: "Owner", possession: "Ready to move", listing: { status: "Active", freshness: "Updated 1 week ago" }, image: IMG.pool, g2: IMG.villa, g3: IMG.house },
].map((p) => build({ ...p, category: "buy" }));

// ---- Rent --------------------------------------------------------------------
export const RENT_PROPERTIES = [
  { propertyId: "RN-301", title: "3 BHK Furnished Apartment", locality: "Indiranagar", city: "Bengaluru", price: "₹85,000/mo", monthlyRent: 85000, furnished: "Fully Furnished", propertyType: "Apartment", bedrooms: 3, area: "1,750 sq.ft", providerType: "Owner", listing: { status: "New listing", freshness: "Added 1 day ago" }, image: IMG.living, g2: IMG.living2, g3: IMG.apt },
  { propertyId: "RN-302", title: "2 BHK Semi-furnished Flat", locality: "Powai", city: "Mumbai", price: "₹65,000/mo", monthlyRent: 65000, furnished: "Semi Furnished", propertyType: "Apartment", bedrooms: 2, area: "1,120 sq.ft", providerType: "Broker", listing: { status: "Active", freshness: "Updated 4 days ago" }, image: IMG.living2, g2: IMG.living, g3: IMG.pool },
  { propertyId: "RN-303", title: "4 BHK Villa on Rent", locality: "Banjara Hills", city: "Hyderabad", price: "₹1,80,000/mo", monthlyRent: 180000, furnished: "Fully Furnished", propertyType: "Villa", bedrooms: 4, area: "4,000 sq.ft", providerType: "Owner", listing: { status: "Active", freshness: "Updated 6 days ago" }, image: IMG.villa, g2: IMG.pool, g3: IMG.living },
  { propertyId: "RN-304", title: "1 BHK Studio Apartment", locality: "Koramangala", city: "Bengaluru", price: "₹32,000/mo", monthlyRent: 32000, furnished: "Unfurnished", propertyType: "Apartment", bedrooms: 1, area: "620 sq.ft", providerType: "Owner", listing: { status: "New listing", freshness: "Added 3 days ago" }, image: IMG.apt, g2: IMG.living, g3: IMG.living2 },
  { propertyId: "RN-305", title: "3 BHK Family Home", locality: "Aundh", city: "Pune", price: "₹58,000/mo", monthlyRent: 58000, furnished: "Semi Furnished", propertyType: "Independent House", bedrooms: 3, area: "1,900 sq.ft", providerType: "Broker", listing: { status: "Active", freshness: "Updated 2 days ago" }, image: IMG.house, g2: IMG.living2, g3: IMG.villa },
].map((p) => build({ ...p, category: "rent" }));

// ---- Commercial --------------------------------------------------------------
export const COMMERCIAL_PROPERTIES = [
  { propertyId: "CM-401", title: "Premium Office Floor", locality: "Cyber City", city: "Gurugram", price: "₹12.0 Cr", subType: "Office", saleType: "Buy", propertyType: "Office", bedrooms: 0, area: "8,400 sq.ft", providerType: "Broker", listing: { status: "Active", freshness: "Updated 1 week ago" }, image: IMG.office, g2: IMG.office2, g3: IMG.city },
  { propertyId: "CM-402", title: "High-street Retail Space", locality: "MG Road", city: "Bengaluru", price: "₹2.4 Lakh/mo", subType: "Retail", saleType: "Lease", propertyType: "Retail", bedrooms: 0, area: "2,200 sq.ft", providerType: "Owner", listing: { status: "New listing", freshness: "Added 2 days ago" }, image: IMG.office2, g2: IMG.office, g3: IMG.city },
  { propertyId: "CM-403", title: "Grade-A Office Suite", locality: "BKC", city: "Mumbai", price: "₹18.5 Cr", subType: "Office", saleType: "Buy", propertyType: "Office", bedrooms: 0, area: "11,000 sq.ft", providerType: "Developer", listing: { status: "Active", freshness: "Updated 5 days ago" }, image: IMG.city, g2: IMG.office, g3: IMG.office2 },
  { propertyId: "CM-404", title: "Logistics Warehouse", locality: "Bhiwandi", city: "Mumbai", price: "₹1.1 Lakh/mo", subType: "Warehouse", saleType: "Lease", propertyType: "Warehouse", bedrooms: 0, area: "24,000 sq.ft", providerType: "Broker", listing: { status: "Active", freshness: "Updated 3 days ago" }, image: IMG.office2, g2: IMG.land, g3: IMG.office },
  { propertyId: "CM-405", title: "Boutique Retail Showroom", locality: "Jubilee Hills", city: "Hyderabad", price: "₹6.2 Cr", subType: "Retail", saleType: "Buy", propertyType: "Retail", bedrooms: 0, area: "3,600 sq.ft", providerType: "Owner", listing: { status: "New listing", freshness: "Added 1 day ago" }, image: IMG.office, g2: IMG.city, g3: IMG.office2 },
].map((p) => build({ ...p, category: "commercial" }));

// ---- Land & Plots ------------------------------------------------------------
export const LAND_PLOTS = [
  { propertyId: "LD-501", title: "Residential Plot — Gated Layout", locality: "Devanahalli", city: "Bengaluru", price: "₹1.4 Cr", landType: "Residential", plotArea: "2,400 sq.ft", ownership: "Freehold", propertyType: "Plot", bedrooms: 0, area: "2,400 sq.ft", providerType: "Owner", listing: { status: "Active", freshness: "Updated 4 days ago" }, image: IMG.land, g2: IMG.land2, g3: IMG.villa },
  { propertyId: "LD-502", title: "Commercial Corner Plot", locality: "Sarjapur Road", city: "Bengaluru", price: "₹3.9 Cr", landType: "Commercial", plotArea: "6,000 sq.ft", ownership: "Freehold", propertyType: "Plot", bedrooms: 0, area: "6,000 sq.ft", providerType: "Broker", listing: { status: "New listing", freshness: "Added 2 days ago" }, image: IMG.land2, g2: IMG.land, g3: IMG.office }, 
  { propertyId: "LD-503", title: "Agricultural Land Parcel", locality: "Shamirpet", city: "Hyderabad", price: "₹85 Lakh/acre", landType: "Agricultural", plotArea: "3 acres", ownership: "Freehold", propertyType: "Plot", bedrooms: 0, area: "3 acres", providerType: "Owner", listing: { status: "Active", freshness: "Updated 1 week ago" }, image: IMG.land, g2: IMG.land2, g3: IMG.city },
  { propertyId: "LD-504", title: "Villa Plot in Township", locality: "Mokila", city: "Hyderabad", price: "₹1.1 Cr", landType: "Residential", plotArea: "3,600 sq.ft", ownership: "Freehold", propertyType: "Plot", bedrooms: 0, area: "3,600 sq.ft", providerType: "Developer", listing: { status: "New listing", freshness: "Added 3 days ago" }, image: IMG.land2, g2: IMG.villa, g3: IMG.land },
].map((p) => build({ ...p, category: "land" }));

// ---- New projects ------------------------------------------------------------
export const NEW_PROJECTS = [
  { id: "NP-501", name: "Aurelia Skypark", developer: "Meridian Developers", location: "Whitefield, Bengaluru", city: "Bengaluru", startingPrice: "₹1.8 Cr onwards", configuration: "2, 3 & 4 BHK", status: "New Launch", possessionYear: "2028", image: px(IMG.apt, 900) },
  { id: "NP-502", name: "The Grove Residences", developer: "Northstar Estates", location: "Sector 150, Noida", city: "Noida", startingPrice: "₹95 Lakh onwards", configuration: "2 & 3 BHK", status: "Under Construction", possessionYear: "2027", image: px(IMG.pool, 900) },
  { id: "NP-503", name: "Meridian One", developer: "Kestrel Group", location: "Cyber City, Gurugram", city: "Gurugram", startingPrice: "₹3.2 Cr onwards", configuration: "3 & 4 BHK", status: "Ready to Move", possessionYear: "2026", image: px(IMG.office2, 900) },
  { id: "NP-504", name: "Riverside Greens", developer: "Northstar Estates", location: "Wakad, Pune", city: "Pune", startingPrice: "₹78 Lakh onwards", configuration: "1, 2 & 3 BHK", status: "New Launch", possessionYear: "2028", image: px(IMG.villa, 900) },
  { id: "NP-505", name: "Solstice Towers", developer: "Kestrel Group", location: "Gachibowli, Hyderabad", city: "Hyderabad", startingPrice: "₹2.4 Cr onwards", configuration: "3 & 4 BHK", status: "Under Construction", possessionYear: "2027", image: px(IMG.city, 900) },
  { id: "NP-506", name: "Willowbrook Enclave", developer: "Meridian Developers", location: "Sarjapur, Bengaluru", city: "Bengaluru", startingPrice: "₹1.2 Cr onwards", configuration: "2 & 3 BHK", status: "New Launch", possessionYear: "2029", image: px(IMG.apt, 900) },
];

// ---- Lookup helpers ----------------------------------------------------------
const ALL_PROPERTIES = [...FEATURED, ...BUY_PROPERTIES, ...RENT_PROPERTIES, ...COMMERCIAL_PROPERTIES, ...LAND_PLOTS].reduce((acc, p) => {
  if (!acc.some((x) => x.slug === p.slug)) acc.push(p);
  return acc;
}, []);

export const getAllProperties = () => ALL_PROPERTIES;
export const getPropertyBySlug = (slug) => ALL_PROPERTIES.find((p) => p.slug === slug);
export const getPropertyById = (id) => ALL_PROPERTIES.find((p) => p.propertyId === id);
export const getSimilar = (property, n = 3) =>
  ALL_PROPERTIES.filter((p) => p.slug !== property.slug && (p.city === property.city || p.propertyType === property.propertyType)).slice(0, n);

// ---- Vertical page configs ---------------------------------------------------
// filter: { key, label, type: 'text'|'select', field, match: 'includes'|'eq'|'min'|'none', options? }
export const VERTICALS = {
  buy: {
    key: "buy", route: "/buy", crumb: "Buy",
    eyebrow: "Buy Property", heading: "Find a home worth buying.",
    sub: "Explore apartments, houses and villas with clearer information and trusted connections.",
    metaTitle: "Buy Property in India | Homes, Apartments & Villas — LOKAGER",
    metaDesc: "Browse homes, apartments and villas for sale across India on LOKAGER — clearer information, smarter comparison and trusted connections.",
    dataset: BUY_PROPERTIES, cardType: "property",
    filters: [
      { key: "city", label: "City / Locality", type: "text", field: "cityLocality", match: "includes" },
      { key: "type", label: "Property Type", type: "select", field: "propertyType", match: "eq", options: ["Apartment", "Independent House", "Villa"] },
      { key: "budget", label: "Budget", type: "select", field: "", match: "none", options: ["Under ₹1 Cr", "₹1 Cr – ₹3 Cr", "₹3 Cr – ₹6 Cr", "Above ₹6 Cr"] },
      { key: "beds", label: "Bedrooms", type: "select", field: "bedrooms", match: "min", options: ["1", "2", "3", "4"] },
      { key: "possession", label: "Availability", type: "select", field: "possession", match: "eq", options: ["Ready to move", "New construction"] },
    ],
  },
  rent: {
    key: "rent", route: "/rent", crumb: "Rent",
    eyebrow: "Rent Property", heading: "Find a home that fits your life.",
    sub: "Flexible, ready-to-move rentals with transparent details and direct connections.",
    metaTitle: "Rent Property in India | Flats & Houses for Rent — LOKAGER",
    metaDesc: "Find flats, houses and villas for rent across India on LOKAGER, with transparent details and trusted connections.",
    dataset: RENT_PROPERTIES, cardType: "property",
    filters: [
      { key: "city", label: "City / Locality", type: "text", field: "cityLocality", match: "includes" },
      { key: "type", label: "Property Type", type: "select", field: "propertyType", match: "eq", options: ["Apartment", "Independent House", "Villa"] },
      { key: "rent", label: "Monthly Rent", type: "select", field: "", match: "none", options: ["Under ₹40k", "₹40k – ₹80k", "₹80k – ₹1.5L", "Above ₹1.5L"] },
      { key: "beds", label: "Bedrooms", type: "select", field: "bedrooms", match: "min", options: ["1", "2", "3", "4"] },
      { key: "furnished", label: "Furnishing", type: "select", field: "furnished", match: "eq", options: ["Unfurnished", "Semi Furnished", "Fully Furnished"] },
    ],
  },
  "new-projects": {
    key: "new-projects", route: "/new-projects", crumb: "New Projects",
    eyebrow: "New Projects", heading: "Discover new property developments.",
    sub: "Upcoming and ready developments from established builders across India.",
    metaTitle: "New Projects & Property Launches in India — LOKAGER",
    metaDesc: "Explore new residential and commercial project launches across India on LOKAGER — configurations, pricing and possession timelines.",
    dataset: NEW_PROJECTS, cardType: "project",
    filters: [
      { key: "city", label: "City", type: "text", field: "city", match: "includes" },
      { key: "developer", label: "Developer", type: "select", field: "developer", match: "eq", options: ["Meridian Developers", "Northstar Estates", "Kestrel Group"] },
      { key: "config", label: "Configuration", type: "select", field: "configuration", match: "includes", options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"] },
      { key: "status", label: "Construction Status", type: "select", field: "status", match: "eq", options: ["New Launch", "Under Construction", "Ready to Move"] },
      { key: "possession", label: "Possession Year", type: "select", field: "possessionYear", match: "eq", options: ["2026", "2027", "2028", "2029"] },
    ],
  },
  commercial: {
    key: "commercial", route: "/commercial", crumb: "Commercial",
    eyebrow: "Commercial Property", heading: "Find the right space for your business.",
    sub: "Offices, retail and warehousing — to buy or lease across key business hubs.",
    metaTitle: "Commercial Property in India | Office, Retail & Warehouse — LOKAGER",
    metaDesc: "Browse office, retail and warehouse spaces to buy or lease across India on LOKAGER.",
    dataset: COMMERCIAL_PROPERTIES, cardType: "property",
    filters: [
      { key: "city", label: "City / Locality", type: "text", field: "cityLocality", match: "includes" },
      { key: "type", label: "Type", type: "select", field: "subType", match: "eq", options: ["Office", "Retail", "Warehouse"] },
      { key: "sale", label: "Buy / Lease", type: "select", field: "saleType", match: "eq", options: ["Buy", "Lease"] },
      { key: "budget", label: "Budget", type: "select", field: "", match: "none", options: ["Under ₹1 Cr", "₹1 Cr – ₹10 Cr", "Above ₹10 Cr"] },
      { key: "area", label: "Built-up Area", type: "select", field: "", match: "none", options: ["Under 2,500 sq.ft", "2,500 – 10,000 sq.ft", "Above 10,000 sq.ft"] },
    ],
  },
  land: {
    key: "land", route: "/land", crumb: "Land",
    eyebrow: "Land & Plots", heading: "Find land with lasting potential.",
    sub: "Residential, commercial and agricultural plots with clear listing details.",
    metaTitle: "Land & Plots for Sale in India — LOKAGER",
    metaDesc: "Find residential, commercial and agricultural plots across India on LOKAGER, with clear listing and ownership details.",
    dataset: LAND_PLOTS, cardType: "property",
    filters: [
      { key: "city", label: "City / Locality", type: "text", field: "cityLocality", match: "includes" },
      { key: "landType", label: "Land Type", type: "select", field: "landType", match: "eq", options: ["Residential", "Commercial", "Agricultural"] },
      { key: "price", label: "Price Range", type: "select", field: "", match: "none", options: ["Under ₹1 Cr", "₹1 Cr – ₹3 Cr", "Above ₹3 Cr"] },
      { key: "plot", label: "Plot Area", type: "select", field: "", match: "none", options: ["Under 3,000 sq.ft", "3,000 – 6,000 sq.ft", "Above 6,000 sq.ft"] },
      { key: "ownership", label: "Ownership", type: "select", field: "ownership", match: "eq", options: ["Freehold", "Leasehold"] },
    ],
  },
};

// Apply active filters to a dataset using the vertical's filter config.
export const applyFilters = (config, values) => {
  return config.dataset.filter((item) =>
    config.filters.every((f) => {
      const v = values[f.key];
      if (!v || f.match === "none") return true;
      if (f.field === "cityLocality") {
        const hay = `${item.city || ""} ${item.locality || ""} ${item.location || ""}`.toLowerCase();
        return hay.includes(v.toLowerCase());
      }
      const fieldVal = item[f.field];
      if (f.match === "includes") return String(fieldVal || "").toLowerCase().includes(v.toLowerCase());
      if (f.match === "eq") return String(fieldVal) === String(v);
      if (f.match === "min") return Number(item[f.field] || 0) >= Number(v);
      return true;
    }),
  );
};
