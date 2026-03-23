import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meny – Yours Sushi & Wok',
  description: 'Se vår meny med sushi, poke bowls, wokrätter och mer. Yours Sushi & Wok på Södermalm.',
};

export default function MenyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
