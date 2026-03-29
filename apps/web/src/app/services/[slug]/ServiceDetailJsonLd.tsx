import {
  ADDRESS,
  EMAIL,
  PHONE,
  SERVICE_AREAS,
  SITE_NAME,
} from "@seashore/content";
import type { ServiceDetail } from "@seashore/types";
import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

export default function ServiceDetailJsonLd({
  detail,
  path,
}: {
  detail: ServiceDetail;
  path: string;
}) {
  const url = `${SITE_URL}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: detail.h1,
        description: detail.metaDescription,
        url,
        provider: {
          "@type": "LocalBusiness",
          name: SITE_NAME,
          telephone: PHONE,
          email: EMAIL,
          address: {
            "@type": "PostalAddress",
            streetAddress: ADDRESS.street,
            addressLocality: ADDRESS.city,
            addressRegion: ADDRESS.state,
            postalCode: ADDRESS.zip,
            addressCountry: "US",
          },
        },
        areaServed: SERVICE_AREAS.map((town) => ({
          "@type": "City",
          name: town,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: detail.h1,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
