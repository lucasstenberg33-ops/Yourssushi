// This utility file now uses edge-compatible fetch requests internally
// rather than using Node.js 'fs' module which crashes on Cloudflare.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://sushinet.se';

// If called on the server/edge, we must ensure absolute URLs. 
const getUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return `${API_BASE}${path}`;
  }
  return path;
};

async function safeFetch(apiPath: string, staticPath: string, defaultData: any) {
  try {
    // 1. Try API first
    const res = await fetch(getUrl(apiPath), { next: { revalidate: 0 } });
    if (res.ok) return await res.json();
  } catch (e) {
    console.error(`API fetch failed for ${apiPath}:`, e);
  }

  try {
    // 2. Fallback to direct static JSON fetch
    const res = await fetch(getUrl(staticPath), { next: { revalidate: 0 } });
    if (res.ok) return await res.json();
  } catch (e) {
    console.error(`Static fallback failed for ${staticPath}:`, e);
  }

  // 3. Last resort: default data
  return defaultData;
}

export async function getMenu() {
  return safeFetch('/api/menu', '/data/menu.json', { categories: [] });
}

export async function getHours() {
  return safeFetch('/api/hours', '/data/hours.json', []);
}

export async function getContact() {
  return safeFetch('/api/contact', '/data/contact.json', {
    address: 'Tegelviksgatan 45, 116 47 Stockholm',
    phone: '08-641 75 05'
  });
}

export async function getAbout() {
  return safeFetch('/api/about', '/data/about.json', { title: 'Om oss', text: '' });
}

