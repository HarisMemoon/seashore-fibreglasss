import { getSiteUrl } from "@/lib/site";

export type BreadcrumbItem = { name: string; path: string };

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const base = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: item.name,
      item:
        item.path === "/"
          ? `${base}/`
          : `${base}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
