import { ADDRESS, EMAIL, PHONE, SERVICE_AREAS, SITE_NAME } from "@seashore/content";
import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndGardenBusiness", "GeneralContractor"],
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Family-owned fiberglass deck contractor serving the South Jersey Shore. Founded in 2020, built on 10+ years of experience — repair, reglass, recolor, new construction, composite decking and vinyl railing.",
  foundingDate: "2020",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    postalCode: ADDRESS.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.2776,
    longitude: -74.5746,
  },
  telephone: PHONE,
  email: EMAIL,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "00:00",
      closes: "00:00",
      description: "By appointment only",
    },
  ],
  areaServed: SERVICE_AREAS.map((town) => ({
    "@type": "City",
    name: town,
    containedInPlace: {
      "@type": "State",
      name: "New Jersey",
    },
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "50",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fiberglass Deck Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fiberglass Deck Repair" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fiberglass Deck Reglass & Resurfacing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fiberglass Deck New Construction" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fiberglass Deck Recolor & Re-Gelcoating" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Composite Decking" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vinyl Railing Installation" } },
    ],
  },
};

export default function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
