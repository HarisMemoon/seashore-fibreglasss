import type { Metadata } from "next";
import { ABOUT_META } from "@seashore/content";
import BreadcrumbJsonLd from "../BreadcrumbJsonLd";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
  title: ABOUT_META.title,
  description: ABOUT_META.description,
};

export default function AboutUsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About us", path: "/about-us" },
        ]}
      />
      <AboutUsClient />
    </>
  );
}
