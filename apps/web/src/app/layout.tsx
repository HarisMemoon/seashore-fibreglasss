import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@seashore/ui';
import { Footer } from '@seashore/ui';

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
  title: 'Seashore Fiberglass | Boat Repair & Fiberglass Services | Jersey Shore',
  description:
    'Expert fiberglass repair and boat restoration on the Jersey Shore. Licensed, family-owned, 50+ reviews. Serving Ocean City and 13 coastal towns.',
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
