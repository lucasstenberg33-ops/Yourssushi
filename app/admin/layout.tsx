import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin – Yours Sushi & Wok',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
