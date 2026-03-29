import { SITE_NAME } from "@seashore/content";
import type { ServiceAreaDetail } from "@seashore/types";
import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

export default function ServiceAreaJsonLd({
  area,
  path,
}: {
  area: ServiceAreaDetail;
  path: string;
}) {
  const url = `${SITE_URL}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        name: area.h1,
        description: area.metaDescription,
        url,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        },
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
            name: "Service areas",
            item: `${SITE_URL}/service-areas`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: area.townName,
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
