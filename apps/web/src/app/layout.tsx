import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { HOME_META } from '@seashore/content';
import './globals.css';
import { Navbar } from '@seashore/ui';
import { Footer } from '@seashore/ui';
import { getSiteUrl } from '@/lib/site';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: HOME_META.title,
  description: HOME_META.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
