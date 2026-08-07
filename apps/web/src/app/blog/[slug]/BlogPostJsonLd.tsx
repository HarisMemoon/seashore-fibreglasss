import { ADDRESS, EMAIL, PHONE, SITE_NAME } from "@seashore/content";
import type { BlogPost } from "@seashore/types";
import { getSiteUrl } from "@/lib/site";

const SITE_URL = getSiteUrl();

export default function BlogPostJsonLd({ post, path }: { post: BlogPost; path: string }) {
  const url = `${SITE_URL}${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        ...(post.image && { image: `${SITE_URL}${post.image}` }),
        author: {
          "@type": "Organization",
          name: SITE_NAME,
          url: `${SITE_URL}/`,
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
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logoo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        url,
        articleSection: post.category ?? "Fiberglass Decks",
        timeRequired: `PT${post.readTimeMinutes}M`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
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
