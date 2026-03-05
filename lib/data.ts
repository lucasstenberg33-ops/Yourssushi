// This utility file now uses edge-compatible fetch requests internally
// rather than using Node.js 'fs' module which crashes on Cloudflare.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://sushinet.se';

// If called on the server/edge, we must ensure absolute URLs. 
// If called on the client, relative URLs (/api/...) work fine.
const getUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return `${API_BASE}${path}`;
  }
  return path;
};

export async function getMenu() {
  const res = await fetch(getUrl('/api/menu'), { next: { revalidate: 0 } });
  return res.json();
}

export async function getHours() {
  const res = await fetch(getUrl('/api/hours'), { next: { revalidate: 0 } });
  return res.json();
}

export async function getContact() {
  const res = await fetch(getUrl('/api/contact'), { next: { revalidate: 0 } });
  return res.json();
}

export async function getAbout() {
  const res = await fetch(getUrl('/api/about'), { next: { revalidate: 0 } });
  return res.json();
}

