import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om oss – Yours Sushi & Wok',
  description: 'Lär känna Yours Sushi & Wok på Tegelviksgatan 45, Södermalm, Stockholm.',
};

export default function OmOssLayout({ children }: { children: React.ReactNode }) {
  return children;
}
