import type { Metadata } from 'next';
import Script from 'next/script';
import { HOME_META, SITE_NAME } from '@seashore/content';
import './globals.css';
import { Navbar } from '@seashore/ui';
import { Footer } from '@seashore/ui';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { getSiteUrl } from '@/lib/site';

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
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_META.title,
    description: HOME_META.description,
  },
  ...(GSC_VERIFICATION || BING_VERIFICATION
    ? {
        verification: {
          ...(GSC_VERIFICATION ? { google: GSC_VERIFICATION } : {}),
          ...(BING_VERIFICATION ? { other: { 'msvalidate.01': BING_VERIFICATION } } : {}),
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
    <html lang="en">
      <body className="font-body antialiased">
        <Navbar />
        {children}
        <Footer />
        <ChatbotWidget />
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