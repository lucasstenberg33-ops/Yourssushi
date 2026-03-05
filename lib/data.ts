// Utility to get base URL for static assets
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_API_URL || 'https://sushinet.se';
};

async function getData(key: string, staticPath: string, defaultData: any) {
  // Temporarily disabling KV and getRequestContext to isolate 500 error
  /*
  if (typeof window === 'undefined') {
    try {
      const { getRequestContext } = await import('@cloudflare/next-on-pages');
      const ctx = getRequestContext();
      if (ctx && ctx.env && ctx.env.DATA_KV) {
        const kv = ctx.env.DATA_KV as any;
        const data = await kv.get(key);
        if (data) return JSON.parse(data);
      }
    } catch (e) {
      console.error(`KV access failed for ${key}:`, e);
    }
  }
  */

  // Fallback to static JSON fetch (absolute for server, relative for client)
  try {
    const url = typeof window === 'undefined' ? `${getBaseUrl()}${staticPath}` : staticPath;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch (e) {
    console.error(`Static fallback failed for ${staticPath}:`, e);
  }

  return defaultData;
}

export async function getMenu() {
  return getData('menu', '/data/menu.json', { categories: [] });
}

export async function getHours() {
  return getData('hours', '/data/hours.json', []);
}

export async function getContact() {
  return getData('contact', '/data/contact.json', {
    address: 'Tegelviksgatan 45, 116 47 Stockholm',
    phone: '08-641 75 05'
  });
}

export async function getAbout() {
  return getData('about', '/data/about.json', { title: 'Om oss', text: '' });
}

