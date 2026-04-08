import type { Metadata } from 'next';
import { HOME_META } from '@seashore/content';
import './globals.css';
import { Navbar } from '@seashore/ui';
import { Footer } from '@seashore/ui';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { getSiteUrl } from '@/lib/site';

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
    <html lang="en">
      <body className="font-body antialiased">
        <Navbar />
        {children}
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}