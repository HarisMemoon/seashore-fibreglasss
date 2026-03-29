import type { Metadata } from "next";
import { HOME_META } from "@seashore/content";
import BreadcrumbJsonLd from "./BreadcrumbJsonLd";
import HomePageClient from "./HomePageClient";
import LocalBusinessJsonLd from "./LocalBusinessJsonLd";

export const metadata: Metadata = {
  title: HOME_META.title,
  description: HOME_META.description,
};

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <LocalBusinessJsonLd />
      <HomePageClient />
    </>
  );
}
