import type { MetadataRoute } from "next";
import {
  getAllBlogSlugs,
  SERVICE_AREA_DETAILS,
  SERVICES,
} from "@seashore/content";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticPaths = [
    "",
    "/about-us",
    "/services",
    "/service-areas",
    "/blog",
    "/contact",
    "/gallery",
    "/faqs",
  ];

  const entries: MetadataRoute.Sitemap = [
    ...staticPaths.map((path) => ({
      url: path === "" ? `${base}/` : `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.85,
    })),
    ...SERVICES.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...SERVICE_AREA_DETAILS.map((a) => ({
      url: `${base}/service-areas/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllBlogSlugs().map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

  return entries;
}
