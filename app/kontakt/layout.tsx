import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt – Yours Sushi & Wok',
  description: 'Kontakta Yours Sushi & Wok. Ring 08-641 75 05 eller besök oss på Tegelviksgatan 45, Stockholm.',
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
