import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Montserrat } from "next/font/google";
import { HOME_META, SITE_NAME } from "@seashore/content";
import "./globals.css";
import { Navbar } from "@seashore/ui";
import { Footer } from "@seashore/ui";
import { ChatbotWidgetLazy } from "@/components/ChatbotWidgetLazy";
import { getSiteUrl } from "@/lib/site";

// Brand fonts, self-hosted by next/font and exposed through the existing
// --font-heading / --font-sans CSS variables (see globals.css + tailwind.config).
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const GA4_ID = process.env.GA4_ID;
const GSC_VERIFICATION = process.env.GSC_VERIFICATION;
const BING_VERIFICATION = process.env.BING_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: HOME_META.title,
  description: HOME_META.description,
  openGraph: {
    title: HOME_META.title,
    description: HOME_META.description,
    url: getSiteUrl(),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_META.title,
    description: HOME_META.description,
  },
  ...(GSC_VERIFICATION || BING_VERIFICATION
    ? {
        verification: {
          ...(GSC_VERIFICATION ? { google: GSC_VERIFICATION } : {}),
          ...(BING_VERIFICATION
            ? { other: { "msvalidate.01": BING_VERIFICATION } }
            : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        {/* Marks the document as JS-enabled before first paint, so any
            reveal-style CSS can hide elements only when JS can reveal them. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="font-body antialiased">
        <Navbar />
        {children}
        <Footer />
        <ChatbotWidgetLazy />
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}
