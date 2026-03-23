import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'Yours Sushi & Wok – Sushi och Wok i Södermalm',
  description:
    'Yours Sushi & Wok på Tegelviksgatan 45, Södermalm. Färsk sushi, poke bowls och wokrätter. Ring 08-641 75 05 för beställning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
