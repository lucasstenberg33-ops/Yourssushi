import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yours Sushi & Woks – Sushi och Wok i Södermalm',
  description:
    'Yours Sushi & Woks på Tegelviksgatan 45, Södermalm. Färsk sushi, poke bowls och wokrätter. Ring 08-641 75 05 för beställning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <StructuredData />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
