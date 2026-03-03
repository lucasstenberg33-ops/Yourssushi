import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om oss – Yours Sushi & Woks',
  description: 'Lär känna Yours Sushi & Woks på Tegelviksgatan 45, Södermalm, Stockholm.',
};

export default function OmOssLayout({ children }: { children: React.ReactNode }) {
  return children;
}
