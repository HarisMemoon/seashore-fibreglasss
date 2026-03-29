import { ADDRESS, EMAIL, PHONE, SERVICE_AREAS, SITE_NAME } from "@seashore/content";
import { getSiteUrl } from "@/lib/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: `${getSiteUrl()}/`,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    postalCode: ADDRESS.zip,
    addressCountry: "US",
  },
  telephone: PHONE,
  email: EMAIL,
  areaServed: SERVICE_AREAS.map((town) => ({
    "@type": "City",
    name: town,
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 5.0,
    reviewCount: 50,
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
