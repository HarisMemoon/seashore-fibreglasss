/** Canonical site origin for metadata, JSON-LD, sitemap, and robots (no trailing slash). */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.seashorefiberglass.com";
  return raw.replace(/\/$/, "");
}
