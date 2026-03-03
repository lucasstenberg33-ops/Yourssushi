# Yours Sushi & Woks Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multi-page informational restaurant website for Yours Sushi & Woks with an admin panel for content management.

**Architecture:** Next.js App Router with CSS Modules. JSON files as data store, API routes for CRUD. Simple password-gated admin panel. Swedish language, clean minimal design using brand colors (#911326, #560a20, #f8f7f7).

**Tech Stack:** Next.js (App Router), CSS Modules, JSON data files, Google Fonts (Inter)

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.js`, `tsconfig.json` (via CLI)
- Create: `.env.local`
- Create: `.gitignore`

**Step 1: Initialize the project**

Run from `/Users/lucasstenberg/Desktop/Yourssushi`:
```bash
npx create-next-app@latest . --app --ts --eslint --no-tailwind --no-src-dir --import-alias "@/*"
```
Select defaults when prompted. This creates the Next.js boilerplate in the current directory.

**Step 2: Clean boilerplate**

Delete the contents of `app/page.tsx`, `app/globals.css`, `app/layout.tsx` — we'll rewrite them.
Delete `app/page.module.css` and any default favicon/images in `/public`.

**Step 3: Move logo into public**

```bash
cp yourssuhi.svg public/logo.svg
```

**Step 4: Create env file**

Create `.env.local`:
```
ADMIN_PASSWORD=yourssushi2026
```

**Step 5: Verify it runs**

Run: `npm run dev`
Expected: Next.js dev server starts on localhost:3000

**Step 6: Commit**

```bash
git init
git add -A
git commit -m "chore: initialize Next.js project"
```

---

## Task 2: Create JSON Data Files

**Files:**
- Create: `data/menu.json`
- Create: `data/hours.json`
- Create: `data/contact.json`
- Create: `data/about.json`

**Step 1: Create data directory**

```bash
mkdir -p data
```

**Step 2: Create `data/contact.json`**

```json
{
  "address": "Tegelviksgatan 45, 116 47 Stockholm",
  "phone": "08-641 75 05",
  "googleMapsUrl": "https://www.google.com/maps/search/?api=1&query=Tegelviksgatan+45+116+47+Stockholm"
}
```

**Step 3: Create `data/hours.json`**

```json
[
  { "day": "Måndag", "hours": "11–21" },
  { "day": "Tisdag", "hours": "11–21" },
  { "day": "Onsdag", "hours": "11–21" },
  { "day": "Torsdag", "hours": "11–21" },
  { "day": "Fredag", "hours": "11–21" },
  { "day": "Lördag", "hours": "12–21" },
  { "day": "Söndag", "hours": "12–21" }
]
```

**Step 4: Create `data/about.json`**

```json
{
  "title": "Om Yours Sushi",
  "text": "Välkommen till Yours Sushi & Woks på Södermalm! Vi serverar färsk sushi, poke bowls och wokrätter med kärlek och omsorg. Besök oss på Tegelviksgatan 45 för en smakupplevelse utöver det vanliga."
}
```

**Step 5: Create `data/menu.json`**

```json
{
  "categories": [
    {
      "id": "bowl",
      "name": "Bowl",
      "items": [
        {
          "id": "poke-lax",
          "name": "Poke bowl med lax",
          "description": "Sushi ris, lax, avocado, sallad och frukt, sesamfrö, chilimayo",
          "price": 155
        },
        {
          "id": "poke-tonfisk",
          "name": "Poke bowl med tonfisk",
          "description": "Sushi ris, tonfisk, avocado, sallad och frukt, sesamfrö, chilimayo",
          "price": 155
        },
        {
          "id": "poke-kyckling",
          "name": "Poke bowl med friterad kyckling",
          "description": "Sushi ris, friterad kyckling, avocado, sallad och frukt, sesamfrö, chilimayo",
          "price": 155
        },
        {
          "id": "poke-tofu",
          "name": "Poke bowl med tofu",
          "description": "Sushi ris, tofu, avocado, sallad och frukt, sesamfrö",
          "price": 150
        },
        {
          "id": "tempura-bowl",
          "name": "Tempura bowl",
          "description": "Sushi ris, friterad scampi, avocado, sallad och frukt, sesamfrö, chilimayo",
          "price": 160
        }
      ]
    },
    {
      "id": "varmratter",
      "name": "Varmrätter",
      "items": [
        {
          "id": "yakiniku",
          "name": "Yakiniku",
          "description": "Strimlad entrecote",
          "price": 145
        },
        {
          "id": "yakitori",
          "name": "Yakitori",
          "description": "5st kycklingspett med sojasås",
          "price": 125
        },
        {
          "id": "saty-gai",
          "name": "Saty gai",
          "description": "5st kycklingspett med Yours homemade jordnötssås",
          "price": 125
        }
      ]
    },
    {
      "id": "wok",
      "name": "Wok & Varmrätter",
      "items": [
        {
          "id": "friterad-kyckling-sweetchili",
          "name": "Friterad kyckling med sweet chili sås",
          "description": "",
          "price": 135
        },
        {
          "id": "curry-kyckling",
          "name": "Curry kyckling",
          "description": "Röd curry gryta med kokosmjölk och blandade grönsaker och kyckling",
          "price": 135
        },
        {
          "id": "cashew-kyckling",
          "name": "Cashew kyckling",
          "description": "Wokad kyckling med cashewnötter och blandade grönsaker",
          "price": 135
        },
        {
          "id": "general-tsos",
          "name": "General Tso's chicken",
          "description": "Krispig torrfriterade kycklingbitar med sursås (Yours homemade), vitlök, chili och grönsaker",
          "price": 135
        },
        {
          "id": "hongkong-chicken",
          "name": "Hongkong chicken",
          "description": "Krispig torrfriterade kycklingbitar med sötsursås (Yours homemade) och grönsaker",
          "price": 135
        },
        {
          "id": "kyckling-bbq",
          "name": "Kyckling BBQ-sås",
          "description": "Krispig torrfriterade kycklingbitar med BBQ-sås och grönsaker, vitlök",
          "price": 135
        },
        {
          "id": "cashew-scampi",
          "name": "Cashew med scampi",
          "description": "Wokad scampi med cashewnötter och blandade grönsaker",
          "price": 155
        },
        {
          "id": "hot-basilika-biff",
          "name": "Hot basilika med biff",
          "description": "Wokad basilika med biff och blandade grönsaker och vitlök",
          "price": 145
        },
        {
          "id": "knaprig-anka",
          "name": "Knaprig anka",
          "description": "Serveras med blandade grönsaker samt ris",
          "price": 160
        },
        {
          "id": "pad-thai-kyckling",
          "name": "Pad thai med kyckling",
          "description": "Stekt risnudlar med kyckling och ägg, blandade grönsaker",
          "price": 145
        },
        {
          "id": "aggnudlar",
          "name": "Äggnudlar med tofu/kyckling",
          "description": "Stekt äggnudlar med tofu/kyckling och ägg, blandade grönsaker",
          "price": 135
        },
        {
          "id": "chaofan-kyckling",
          "name": "Chaofan med kyckling",
          "description": "Stekt ris med kyckling och ägg, blandade grönsaker",
          "price": 135
        },
        {
          "id": "svartabonor-kyckling",
          "name": "Svartabönor kyckling",
          "description": "Wokad kyckling med vitlök, grönsaker och svartabönor, chili",
          "price": 135
        },
        {
          "id": "thai-chili-kyckling",
          "name": "Thai chili kyckling",
          "description": "Wokad kyckling med thai chili och grönsaker",
          "price": 135
        },
        {
          "id": "sichuan-kyckling",
          "name": "Sichuan kyckling",
          "description": "Wokad kyckling med sichuan chili, vitlök och grönsaker",
          "price": 135
        }
      ]
    },
    {
      "id": "sma-ratter",
      "name": "Små rätter",
      "items": [
        {
          "id": "varrullar",
          "name": "Vårrullar",
          "description": "Friterade vegan vårrullar",
          "price": "65 / 125",
          "priceNote": "6st / 12st (med ris)"
        },
        {
          "id": "dumpling",
          "name": "Dumpling med kyckling / vegetarisk",
          "description": "",
          "price": "65 / 125",
          "priceNote": "5st / 10st (med ris)"
        },
        {
          "id": "sjograssallad",
          "name": "Sjögrässallad",
          "description": "",
          "price": 60
        },
        {
          "id": "friterad-rakor",
          "name": "Friterade räkor",
          "description": "Friterade stora räkor",
          "price": "85 / 150",
          "priceNote": "4st / 8st (med ris)"
        },
        {
          "id": "ris",
          "name": "Ris",
          "description": "",
          "price": "35 / 45",
          "priceNote": "Liten / Stor"
        },
        {
          "id": "nigiri-st",
          "name": "Nigiri",
          "description": "",
          "price": 20,
          "priceNote": "Per styck"
        },
        {
          "id": "lask",
          "name": "Läsk",
          "description": "",
          "price": 20,
          "priceNote": "Per styck"
        }
      ]
    },
    {
      "id": "sushi-blandad",
      "name": "Sushi – Blandad sushi",
      "items": [
        {
          "id": "sushi-7",
          "name": "7 bitars",
          "description": "2 maki och 2 lax, 1 räka, 1 krabba, 1 avocado",
          "price": 120
        },
        {
          "id": "sushi-9",
          "name": "9 bitars",
          "description": "3 maki och 3 lax, 1 räka, 1 krabba, 1 avocado",
          "price": 130
        },
        {
          "id": "sushi-11",
          "name": "11 bitars",
          "description": "4 maki och 3 lax, 1 räka, 1 tuna, 1 krabba, 1 avocado",
          "price": 145
        },
        {
          "id": "sushi-13",
          "name": "13 bitars",
          "description": "5 maki och 4 lax, 1 räka, 1 tuna, 1 krabba, 1 avocado",
          "price": 175
        },
        {
          "id": "sushi-15",
          "name": "15 bitars",
          "description": "5 maki och 5 lax, 1 räka, 1 tuna, 1 krabba, 2 avocado",
          "price": 190
        }
      ]
    },
    {
      "id": "sushi-mix-nigiri",
      "name": "Sushi – Mix nigiri",
      "description": "Chilimayo, ålsås, rostad lök, gräslök på",
      "items": [
        {
          "id": "mix-nigiri-7",
          "name": "7 nigiri",
          "description": "2 rå lax, 2 halstrad lax, 1 räka, 1 krabba, 1 avocado",
          "price": 125
        },
        {
          "id": "mix-nigiri-8",
          "name": "8 nigiri",
          "description": "2 rå lax, 2 halstrad lax, 1 räka, 1 tuna, 1 krabba, 1 avocado",
          "price": 140
        },
        {
          "id": "mix-nigiri-9",
          "name": "9 nigiri",
          "description": "2 rå lax, 2 halstrad lax, 2 räka, 1 tuna, 1 krabba, 1 avocado",
          "price": 145
        },
        {
          "id": "mix-nigiri-11",
          "name": "11 nigiri",
          "description": "3 rå lax, 2 halstrad lax, 2 räka, 1 tuna, 1 krabba, 2 avocado",
          "price": 160
        },
        {
          "id": "mix-nigiri-13",
          "name": "13 nigiri",
          "description": "4 rå lax, 3 halstrad lax, 2 räka, 1 tuna, 1 krabba, 2 avocado",
          "price": 180
        },
        {
          "id": "mix-nigiri-15",
          "name": "15 nigiri",
          "description": "4 rå lax, 4 halstrad lax, 2 räka, 1 tuna, 1 krabba, 3 avocado",
          "price": 200
        }
      ]
    },
    {
      "id": "sushi-shake-lax",
      "name": "Sushi – Shake lax nigiri",
      "description": "Halstrad lax nigiri toppad med ålsås, chilimayo",
      "items": [
        {
          "id": "shake-8",
          "name": "8 nigiri",
          "description": "",
          "price": 150
        },
        {
          "id": "shake-9",
          "name": "9 nigiri",
          "description": "",
          "price": 155
        },
        {
          "id": "shake-11",
          "name": "11 nigiri",
          "description": "",
          "price": 165
        },
        {
          "id": "shake-13",
          "name": "13 nigiri",
          "description": "",
          "price": 185
        },
        {
          "id": "shake-15",
          "name": "15 nigiri",
          "description": "",
          "price": 210
        }
      ]
    },
    {
      "id": "sushi-familj",
      "name": "Familje Sushi",
      "items": [
        {
          "id": "familj-32",
          "name": "32 bitars",
          "description": "14st maki och 18 nigiri (kockens val)",
          "price": 380
        }
      ]
    },
    {
      "id": "ura-maki-sashimi",
      "name": "Ura Maki & Sashimi",
      "description": "Chilimayo, ålsås, sriracha",
      "items": [
        {
          "id": "california-maki",
          "name": "California maki",
          "description": "Gurka, ägg, krabba och avocado",
          "price": 140
        },
        {
          "id": "friterad-california",
          "name": "Friterad california maki",
          "description": "",
          "price": 150
        },
        {
          "id": "spicy-tuna-lax",
          "name": "Spicy tuna / lax",
          "description": "Avocado och tunfisk/lax, friterad hela maki",
          "price": 155
        },
        {
          "id": "teriyaki-maki",
          "name": "Teriyaki maki",
          "description": "Avocado insidan och grillad lax utanför",
          "price": 155
        },
        {
          "id": "tempura-maki",
          "name": "Tempura maki",
          "description": "Friterade tigerräkor och avocado insidan",
          "price": 155
        },
        {
          "id": "special-maki",
          "name": "Special maki",
          "description": "Avocado, friterade tigerräkor med halstrad lax topping",
          "price": 185
        },
        {
          "id": "sashimi-9",
          "name": "Sashimi 9st",
          "description": "Rå fisk",
          "price": 155
        },
        {
          "id": "sashimi-18",
          "name": "Sashimi 18st",
          "description": "Rå fisk",
          "price": 230
        }
      ]
    }
  ]
}
```

**Step 6: Commit**

```bash
git add data/
git commit -m "feat: add restaurant data files (menu, hours, contact, about)"
```

---

## Task 3: Build Design System (Global Styles & Layout)

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/layout.module.css`
- Create: `components/Navbar.tsx`
- Create: `components/Navbar.module.css`
- Create: `components/Footer.tsx`
- Create: `components/Footer.module.css`

**Step 1: Write `app/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --color-crimson: #911326;
  --color-burgundy: #560a20;
  --color-offwhite: #f8f7f7;
  --color-white: #ffffff;
  --color-black: #1a1a1a;
  --color-gray: #666666;
  --color-light-gray: #e5e5e5;
  --font-family: 'Inter', sans-serif;
  --max-width: 1100px;
  --nav-height: 64px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  color: var(--color-black);
  background-color: var(--color-white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}
```

**Step 2: Write `components/Navbar.tsx`**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const links = [
  { href: '/', label: 'Hem' },
  { href: '/meny', label: 'Meny' },
  { href: '/om-oss', label: 'Om oss' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Yours Sushi" width={120} height={40} priority />
        </Link>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Öppna meny"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
        </button>
        <ul className={`${styles.links} ${menuOpen ? styles.showMenu : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```

**Step 3: Write `components/Navbar.module.css`**

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-light-gray);
  height: var(--nav-height);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
}

.links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.link {
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.link:hover,
.active {
  color: var(--color-crimson);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.bar {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-black);
  transition: transform 0.3s, opacity 0.3s;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .links {
    display: none;
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    background: var(--color-white);
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    border-bottom: 1px solid var(--color-light-gray);
  }

  .showMenu {
    display: flex;
  }
}
```

**Step 4: Write `components/Footer.tsx`**

```tsx
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Yours Sushi & Woks</h3>
          <p>Tegelviksgatan 45</p>
          <p>116 47 Stockholm</p>
        </div>
        <div className={styles.column}>
          <h3>Kontakt</h3>
          <p><a href="tel:08-6417505">08-641 75 05</a></p>
        </div>
        <div className={styles.column}>
          <h3>Sidor</h3>
          <nav>
            <Link href="/meny">Meny</Link>
            <Link href="/om-oss">Om oss</Link>
            <Link href="/kontakt">Kontakt</Link>
          </nav>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Yours Sushi & Woks</p>
      </div>
    </footer>
  );
}
```

**Step 5: Write `components/Footer.module.css`**

```css
.footer {
  background: var(--color-burgundy);
  color: var(--color-offwhite);
  padding: 3rem 1.5rem 1.5rem;
  margin-top: 4rem;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.column h3 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  opacity: 0.7;
}

.column p,
.column a {
  font-size: 0.95rem;
  line-height: 1.8;
}

.column a:hover {
  text-decoration: underline;
}

.column nav {
  display: flex;
  flex-direction: column;
}

.bottom {
  max-width: var(--max-width);
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
```

**Step 6: Write `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 7: Verify layout renders**

Run: `npm run dev`
Expected: Page loads with sticky navbar and footer on localhost:3000.

**Step 8: Commit**

```bash
git add app/ components/
git commit -m "feat: add global styles, navbar, and footer"
```

---

## Task 4: Build Home Page

**Files:**
- Create: `app/page.tsx`
- Create: `app/page.module.css`
- Create: `lib/data.ts`

**Step 1: Write `lib/data.ts`**

Helper functions to read JSON data files (used across pages and API routes):

```ts
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function readJson(filename: string) {
  const filePath = path.join(dataDir, filename);
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeJson(filename: string, data: unknown) {
  const filePath = path.join(dataDir, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getMenu() {
  return readJson('menu.json');
}

export function saveMenu(data: unknown) {
  writeJson('menu.json', data);
}

export function getHours() {
  return readJson('hours.json');
}

export function saveHours(data: unknown) {
  writeJson('hours.json', data);
}

export function getContact() {
  return readJson('contact.json');
}

export function saveContact(data: unknown) {
  writeJson('contact.json', data);
}

export function getAbout() {
  return readJson('about.json');
}

export function saveAbout(data: unknown) {
  writeJson('about.json', data);
}
```

**Step 2: Write `app/page.tsx`**

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { getHours, getContact } from '@/lib/data';
import styles from './page.module.css';

const dayMap: Record<string, number> = {
  Söndag: 0,
  Måndag: 1,
  Tisdag: 2,
  Onsdag: 3,
  Torsdag: 4,
  Fredag: 5,
  Lördag: 6,
};

export default function Home() {
  const hours = getHours() as { day: string; hours: string }[];
  const contact = getContact() as {
    address: string;
    phone: string;
    googleMapsUrl: string;
  };

  const today = new Date().getDay();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/logo.svg"
          alt="Yours Sushi & Woks"
          width={280}
          height={156}
          priority
          className={styles.heroLogo}
        />
        <p className={styles.tagline}>Sushi & Wok i Södermalm</p>
        <div className={styles.cta}>
          <Link href="/meny" className={styles.ctaPrimary}>
            Se menyn
          </Link>
          <Link href="/kontakt" className={styles.ctaSecondary}>
            Kontakta oss
          </Link>
        </div>
      </section>

      <section className={styles.info}>
        <div className={styles.infoCard}>
          <h2>Öppettider idag</h2>
          {hours.map((h) => {
            const isToday = dayMap[h.day] === today;
            return (
              <div
                key={h.day}
                className={`${styles.hourRow} ${isToday ? styles.today : ''}`}
              >
                <span>{h.day}</span>
                <span>{h.hours}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.infoCard}>
          <h2>Hitta hit</h2>
          <p>{contact.address}</p>
          <a
            href={contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            Visa på kartan
          </a>
          <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className={styles.phoneLink}>
            {contact.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
```

**Step 3: Write `app/page.module.css`**

```css
.page {
  min-height: calc(100vh - var(--nav-height));
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem;
  background: var(--color-offwhite);
  text-align: center;
}

.heroLogo {
  margin-bottom: 1.5rem;
}

.tagline {
  font-size: 1.25rem;
  color: var(--color-gray);
  margin-bottom: 2rem;
}

.cta {
  display: flex;
  gap: 1rem;
}

.ctaPrimary {
  background: var(--color-crimson);
  color: var(--color-white);
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.2s;
}

.ctaPrimary:hover {
  background: var(--color-burgundy);
}

.ctaSecondary {
  border: 2px solid var(--color-crimson);
  color: var(--color-crimson);
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}

.ctaSecondary:hover {
  background: var(--color-crimson);
  color: var(--color-white);
}

.info {
  max-width: var(--max-width);
  margin: 3rem auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.infoCard {
  padding: 2rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 8px;
}

.infoCard h2 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--color-burgundy);
}

.hourRow {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  font-size: 0.95rem;
}

.today {
  font-weight: 700;
  color: var(--color-crimson);
}

.mapLink,
.phoneLink {
  display: block;
  margin-top: 0.75rem;
  color: var(--color-crimson);
  font-weight: 500;
}

.mapLink:hover,
.phoneLink:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem;
  }

  .info {
    grid-template-columns: 1fr;
  }

  .cta {
    flex-direction: column;
    width: 100%;
  }

  .ctaPrimary,
  .ctaSecondary {
    text-align: center;
  }
}
```

**Step 4: Verify home page renders**

Run: `npm run dev`, visit `http://localhost:3000`
Expected: Hero with logo, tagline, two CTA buttons. Below: hours table and contact card.

**Step 5: Commit**

```bash
git add lib/ app/page.tsx app/page.module.css
git commit -m "feat: add home page with hero, hours, and contact info"
```

---

## Task 5: Build Menu Page

**Files:**
- Create: `app/meny/page.tsx`
- Create: `app/meny/page.module.css`

**Step 1: Write `app/meny/page.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  priceNote?: string;
};

type Category = {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
};

type MenuData = {
  categories: Category[];
};

export default function MenyPage() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/menu')
      .then((r) => r.json())
      .then((data) => setMenu(data));
  }, []);

  if (!menu) return <div className={styles.loading}>Laddar meny...</div>;

  const filtered = activeCategory
    ? menu.categories.filter((c) => c.id === activeCategory)
    : menu.categories;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Meny</h1>

      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${!activeCategory ? styles.active : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          Alla
        </button>
        {menu.categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className={styles.menu}>
        {filtered.map((category) => (
          <section key={category.id} className={styles.category}>
            <h2 className={styles.categoryName}>{category.name}</h2>
            {category.description && (
              <p className={styles.categoryDesc}>{category.description}</p>
            )}
            <div className={styles.items}>
              {category.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>
                      {typeof item.price === 'number'
                        ? `${item.price} kr`
                        : `${item.price} kr`}
                    </span>
                  </div>
                  {item.description && (
                    <p className={styles.itemDesc}>{item.description}</p>
                  )}
                  {item.priceNote && (
                    <p className={styles.priceNote}>{item.priceNote}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Write `app/meny/page.module.css`**

```css
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-burgundy);
}

.loading {
  text-align: center;
  padding: 4rem;
  color: var(--color-gray);
}

.filters {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-light-gray);
  -webkit-overflow-scrolling: touch;
}

.filterBtn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 20px;
  background: var(--color-white);
  font-size: 0.85rem;
  font-family: var(--font-family);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.filterBtn:hover {
  border-color: var(--color-crimson);
  color: var(--color-crimson);
}

.filterBtn.active {
  background: var(--color-crimson);
  color: var(--color-white);
  border-color: var(--color-crimson);
}

.category {
  margin-bottom: 2.5rem;
}

.categoryName {
  font-size: 1.3rem;
  color: var(--color-burgundy);
  margin-bottom: 0.25rem;
}

.categoryDesc {
  font-size: 0.85rem;
  color: var(--color-gray);
  margin-bottom: 1rem;
  font-style: italic;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-light-gray);
}

.itemHeader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.itemName {
  font-weight: 600;
  font-size: 1rem;
}

.itemPrice {
  font-weight: 600;
  color: var(--color-crimson);
  white-space: nowrap;
}

.itemDesc {
  font-size: 0.9rem;
  color: var(--color-gray);
  margin-top: 0.25rem;
}

.priceNote {
  font-size: 0.8rem;
  color: var(--color-gray);
  margin-top: 0.15rem;
  font-style: italic;
}
```

**Step 3: Create menu API route `app/api/menu/route.ts`**

```ts
import { NextResponse } from 'next/server';
import { getMenu, saveMenu } from '@/lib/data';

export async function GET() {
  const menu = getMenu();
  return NextResponse.json(menu);
}

export async function PUT(request: Request) {
  const data = await request.json();
  saveMenu(data);
  return NextResponse.json({ success: true });
}
```

**Step 4: Verify menu page**

Run: `npm run dev`, visit `http://localhost:3000/meny`
Expected: Menu renders with all categories and filter buttons.

**Step 5: Commit**

```bash
git add app/meny/ app/api/menu/
git commit -m "feat: add menu page with category filters and API route"
```

---

## Task 6: Build About Page

**Files:**
- Create: `app/om-oss/page.tsx`
- Create: `app/om-oss/page.module.css`

**Step 1: Write `app/om-oss/page.tsx`**

```tsx
import { getAbout, getContact } from '@/lib/data';
import styles from './page.module.css';

export default function OmOss() {
  const about = getAbout() as { title: string; text: string };
  const contact = getContact() as {
    address: string;
    phone: string;
    googleMapsUrl: string;
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{about.title}</h1>
      <p className={styles.text}>{about.text}</p>

      <div className={styles.map}>
        <h2>Hitta hit</h2>
        <p>{contact.address}</p>
        <a
          href={contact.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mapLink}
        >
          Öppna i Google Maps
        </a>
      </div>
    </div>
  );
}
```

**Step 2: Write `app/om-oss/page.module.css`**

```css
.page {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.title {
  font-size: 2rem;
  color: var(--color-burgundy);
  margin-bottom: 1.5rem;
}

.text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-black);
  margin-bottom: 3rem;
}

.map {
  padding: 2rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 8px;
}

.map h2 {
  font-size: 1.1rem;
  color: var(--color-burgundy);
  margin-bottom: 0.75rem;
}

.mapLink {
  display: inline-block;
  margin-top: 0.75rem;
  color: var(--color-crimson);
  font-weight: 500;
}

.mapLink:hover {
  text-decoration: underline;
}
```

**Step 3: Verify about page**

Run: `npm run dev`, visit `http://localhost:3000/om-oss`
Expected: About text and map card renders.

**Step 4: Commit**

```bash
git add app/om-oss/
git commit -m "feat: add about page"
```

---

## Task 7: Build Contact Page

**Files:**
- Create: `app/kontakt/page.tsx`
- Create: `app/kontakt/page.module.css`

**Step 1: Write `app/kontakt/page.tsx`**

```tsx
import { getContact, getHours } from '@/lib/data';
import styles from './page.module.css';

const dayMap: Record<string, number> = {
  Söndag: 0,
  Måndag: 1,
  Tisdag: 2,
  Onsdag: 3,
  Torsdag: 4,
  Fredag: 5,
  Lördag: 6,
};

export default function Kontakt() {
  const contact = getContact() as {
    address: string;
    phone: string;
    googleMapsUrl: string;
  };
  const hours = getHours() as { day: string; hours: string }[];
  const today = new Date().getDay();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Kontakt</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Ring oss</h2>
          <a
            href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
            className={styles.phone}
          >
            {contact.phone}
          </a>
        </div>

        <div className={styles.card}>
          <h2>Besök oss</h2>
          <p>{contact.address}</p>
          <a
            href={contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Visa på kartan
          </a>
        </div>

        <div className={`${styles.card} ${styles.hoursCard}`}>
          <h2>Öppettider</h2>
          {hours.map((h) => {
            const isToday = dayMap[h.day] === today;
            return (
              <div
                key={h.day}
                className={`${styles.hourRow} ${isToday ? styles.today : ''}`}
              >
                <span>{h.day}</span>
                <span>{h.hours}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Write `app/kontakt/page.module.css`**

```css
.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.title {
  font-size: 2rem;
  color: var(--color-burgundy);
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.card {
  padding: 2rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 8px;
}

.card h2 {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-burgundy);
  margin-bottom: 0.75rem;
}

.hoursCard {
  grid-column: 1 / -1;
}

.phone {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-crimson);
}

.phone:hover {
  text-decoration: underline;
}

.link {
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--color-crimson);
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.hourRow {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-size: 0.95rem;
  max-width: 400px;
}

.today {
  font-weight: 700;
  color: var(--color-crimson);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

**Step 3: Verify contact page**

Run: `npm run dev`, visit `http://localhost:3000/kontakt`
Expected: Phone (click-to-call), address (map link), and hours table.

**Step 4: Commit**

```bash
git add app/kontakt/
git commit -m "feat: add contact page with hours, phone, and map"
```

---

## Task 8: Add SEO & Structured Data

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/StructuredData.tsx`
- Modify: `app/meny/page.tsx` (add metadata)

**Step 1: Write `components/StructuredData.tsx`**

```tsx
export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Yours Sushi & Woks',
    image: '/logo.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tegelviksgatan 45',
      addressLocality: 'Stockholm',
      postalCode: '116 47',
      addressCountry: 'SE',
    },
    telephone: '+46864175050',
    url: 'https://yourssushi.se',
    servesCuisine: ['Sushi', 'Japanese', 'Thai', 'Wok'],
    priceRange: '$$',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '11:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '11:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '11:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '11:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '11:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '12:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '12:00', closes: '21:00' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

**Step 2: Add StructuredData to `app/layout.tsx`**

Add `<StructuredData />` inside `<body>` before `<Navbar />`.

**Step 3: Add per-page metadata**

Add `export const metadata` to `app/meny/page.tsx` — but since it's a client component, create a separate `app/meny/layout.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meny – Yours Sushi & Woks',
  description: 'Se vår meny med sushi, poke bowls, wokrätter och mer. Yours Sushi & Woks på Södermalm.',
};

export default function MenyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create similar layouts for `/om-oss` and `/kontakt`:

`app/om-oss/layout.tsx`:
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om oss – Yours Sushi & Woks',
  description: 'Lär känna Yours Sushi & Woks på Tegelviksgatan 45, Södermalm, Stockholm.',
};

export default function OmOssLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

`app/kontakt/layout.tsx`:
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt – Yours Sushi & Woks',
  description: 'Kontakta Yours Sushi & Woks. Ring 08-641 75 05 eller besök oss på Tegelviksgatan 45, Stockholm.',
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

**Step 4: Verify**

Check page source for JSON-LD and meta tags.

**Step 5: Commit**

```bash
git add components/StructuredData.tsx app/
git commit -m "feat: add SEO structured data and per-page metadata"
```

---

## Task 9: Build Admin Authentication

**Files:**
- Create: `app/admin/page.tsx`
- Create: `app/admin/page.module.css`
- Create: `app/admin/layout.tsx`
- Create: `app/api/admin/login/route.ts`
- Create: `lib/auth.ts`

**Step 1: Write `lib/auth.ts`**

```ts
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';
const SESSION_VALUE = 'authenticated';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export function getSessionCookie() {
  return {
    name: SESSION_COOKIE,
    value: SESSION_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  };
}
```

**Step 2: Write `app/api/admin/login/route.ts`**

```ts
import { NextResponse } from 'next/server';
import { getSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Fel lösenord' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  const cookie = getSessionCookie();
  response.cookies.set(cookie.name, cookie.value, cookie);
  return response;
}
```

**Step 3: Write `app/admin/layout.tsx`**

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin – Yours Sushi & Woks',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

**Step 4: Write `app/admin/page.tsx`**

```tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((data) => {
        setAuthenticated(data.authenticated);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      setError('Fel lösenord');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthenticated(false);
  }

  if (checking) return <div className={styles.loading}>Laddar...</div>;

  if (!authenticated) {
    return (
      <div className={styles.loginPage}>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <h1>Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lösenord"
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Logga in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Admin</h1>
        <button onClick={handleLogout} className={styles.logout}>
          Logga ut
        </button>
      </div>
      <div className={styles.grid}>
        <a href="/admin/meny" className={styles.card}>
          <h2>Meny</h2>
          <p>Redigera menyn</p>
        </a>
        <a href="/admin/oppettider" className={styles.card}>
          <h2>Öppettider</h2>
          <p>Ändra öppettider</p>
        </a>
        <a href="/admin/kontakt" className={styles.card}>
          <h2>Kontakt</h2>
          <p>Ändra kontaktuppgifter</p>
        </a>
        <a href="/admin/om-oss" className={styles.card}>
          <h2>Om oss</h2>
          <p>Redigera om oss-text</p>
        </a>
      </div>
    </div>
  );
}
```

**Step 5: Write `app/admin/page.module.css`**

```css
.loading {
  text-align: center;
  padding: 4rem;
}

.loginPage {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--nav-height) - 200px);
}

.loginForm {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 8px;
  width: 100%;
  max-width: 360px;
}

.loginForm h1 {
  font-size: 1.5rem;
  color: var(--color-burgundy);
}

.input {
  padding: 0.75rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 6px;
  font-size: 1rem;
  font-family: var(--font-family);
}

.input:focus {
  outline: none;
  border-color: var(--color-crimson);
}

.button {
  padding: 0.75rem;
  background: var(--color-crimson);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: var(--font-family);
  cursor: pointer;
  font-weight: 600;
}

.button:hover {
  background: var(--color-burgundy);
}

.error {
  color: var(--color-crimson);
  font-size: 0.9rem;
}

.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: var(--color-burgundy);
}

.logout {
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid var(--color-light-gray);
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font-family);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.card {
  padding: 2rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 8px;
  transition: border-color 0.2s;
}

.card:hover {
  border-color: var(--color-crimson);
}

.card h2 {
  font-size: 1.1rem;
  color: var(--color-burgundy);
  margin-bottom: 0.25rem;
}

.card p {
  color: var(--color-gray);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

**Step 6: Create auth check and logout API routes**

`app/api/admin/check/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const auth = await isAuthenticated();
  return NextResponse.json({ authenticated: auth });
}
```

`app/api/admin/logout/route.ts`:
```ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
  return response;
}
```

**Step 7: Verify login flow**

Visit `http://localhost:3000/admin`, enter password, confirm dashboard shows.

**Step 8: Commit**

```bash
git add lib/auth.ts app/admin/ app/api/admin/
git commit -m "feat: add admin authentication with password gate"
```

---

## Task 10: Build Admin – Menu Editor

**Files:**
- Create: `app/admin/meny/page.tsx`
- Create: `app/admin/meny/page.module.css`

**Step 1: Write `app/admin/meny/page.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  priceNote?: string;
};

type Category = {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
};

type MenuData = { categories: Category[] };

export default function AdminMeny() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((d) => { if (!d.authenticated) router.push('/admin'); });
    fetch('/api/menu')
      .then((r) => r.json())
      .then(setMenu);
  }, [router]);

  async function save() {
    setSaving(true);
    await fetch('/api/menu', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menu),
    });
    setSaving(false);
  }

  function updateItem(catIdx: number, itemIdx: number, field: keyof MenuItem, value: string) {
    if (!menu) return;
    const updated = structuredClone(menu);
    const item = updated.categories[catIdx].items[itemIdx];
    if (field === 'price') {
      const num = Number(value);
      (item as any)[field] = isNaN(num) ? value : num;
    } else {
      (item as any)[field] = value;
    }
    setMenu(updated);
  }

  function addItem(catIdx: number) {
    if (!menu) return;
    const updated = structuredClone(menu);
    const id = `item-${Date.now()}`;
    updated.categories[catIdx].items.push({
      id,
      name: '',
      description: '',
      price: 0,
    });
    setMenu(updated);
  }

  function removeItem(catIdx: number, itemIdx: number) {
    if (!menu) return;
    const updated = structuredClone(menu);
    updated.categories[catIdx].items.splice(itemIdx, 1);
    setMenu(updated);
  }

  function addCategory() {
    if (!menu) return;
    const updated = structuredClone(menu);
    const id = `cat-${Date.now()}`;
    updated.categories.push({ id, name: '', items: [] });
    setMenu(updated);
  }

  function removeCategory(catIdx: number) {
    if (!menu) return;
    const updated = structuredClone(menu);
    updated.categories.splice(catIdx, 1);
    setMenu(updated);
  }

  if (!menu) return <div className={styles.loading}>Laddar...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Redigera meny</h1>
        <div className={styles.actions}>
          <a href="/admin" className={styles.back}>Tillbaka</a>
          <button onClick={save} disabled={saving} className={styles.saveBtn}>
            {saving ? 'Sparar...' : 'Spara'}
          </button>
        </div>
      </div>

      {menu.categories.map((cat, catIdx) => (
        <div key={cat.id} className={styles.category}>
          <div className={styles.catHeader}>
            <input
              value={cat.name}
              onChange={(e) => {
                const updated = structuredClone(menu);
                updated.categories[catIdx].name = e.target.value;
                setMenu(updated);
              }}
              className={styles.catNameInput}
              placeholder="Kategorinamn"
            />
            <button onClick={() => removeCategory(catIdx)} className={styles.removeBtn}>
              Ta bort kategori
            </button>
          </div>

          {cat.items.map((item, itemIdx) => (
            <div key={item.id} className={styles.item}>
              <input
                value={item.name}
                onChange={(e) => updateItem(catIdx, itemIdx, 'name', e.target.value)}
                placeholder="Namn"
                className={styles.input}
              />
              <input
                value={item.description}
                onChange={(e) => updateItem(catIdx, itemIdx, 'description', e.target.value)}
                placeholder="Beskrivning"
                className={styles.input}
              />
              <input
                value={String(item.price)}
                onChange={(e) => updateItem(catIdx, itemIdx, 'price', e.target.value)}
                placeholder="Pris"
                className={styles.priceInput}
              />
              <button onClick={() => removeItem(catIdx, itemIdx)} className={styles.removeItemBtn}>
                &times;
              </button>
            </div>
          ))}

          <button onClick={() => addItem(catIdx)} className={styles.addBtn}>
            + Lägg till rätt
          </button>
        </div>
      ))}

      <button onClick={addCategory} className={styles.addCatBtn}>
        + Lägg till kategori
      </button>
    </div>
  );
}
```

**Step 2: Write `app/admin/meny/page.module.css`**

```css
.loading {
  text-align: center;
  padding: 4rem;
}

.page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: var(--color-burgundy);
}

.actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.back {
  color: var(--color-gray);
  font-size: 0.9rem;
}

.saveBtn {
  padding: 0.6rem 1.5rem;
  background: var(--color-crimson);
  color: white;
  border: none;
  border-radius: 6px;
  font-family: var(--font-family);
  font-weight: 600;
  cursor: pointer;
}

.saveBtn:disabled {
  opacity: 0.5;
}

.saveBtn:hover:not(:disabled) {
  background: var(--color-burgundy);
}

.category {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 8px;
}

.catHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.catNameInput {
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-bottom: 2px solid var(--color-light-gray);
  padding: 0.25rem 0;
  font-family: var(--font-family);
  flex: 1;
  margin-right: 1rem;
}

.catNameInput:focus {
  outline: none;
  border-color: var(--color-crimson);
}

.removeBtn {
  color: var(--color-crimson);
  background: none;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: var(--font-family);
}

.item {
  display: grid;
  grid-template-columns: 1fr 2fr 80px 32px;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

.input,
.priceInput {
  padding: 0.5rem;
  border: 1px solid var(--color-light-gray);
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: var(--font-family);
}

.input:focus,
.priceInput:focus {
  outline: none;
  border-color: var(--color-crimson);
}

.priceInput {
  text-align: right;
}

.removeItemBtn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--color-gray);
  cursor: pointer;
  padding: 0;
}

.removeItemBtn:hover {
  color: var(--color-crimson);
}

.addBtn {
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background: none;
  border: 1px dashed var(--color-light-gray);
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font-family);
  color: var(--color-gray);
  width: 100%;
}

.addBtn:hover {
  border-color: var(--color-crimson);
  color: var(--color-crimson);
}

.addCatBtn {
  padding: 0.75rem;
  background: none;
  border: 2px dashed var(--color-light-gray);
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-family);
  color: var(--color-gray);
  width: 100%;
  font-size: 1rem;
}

.addCatBtn:hover {
  border-color: var(--color-crimson);
  color: var(--color-crimson);
}

@media (max-width: 768px) {
  .item {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
```

**Step 3: Verify menu editor**

Visit `/admin/meny`, edit an item name, click save, refresh page — change persists.

**Step 4: Commit**

```bash
git add app/admin/meny/
git commit -m "feat: add admin menu editor with CRUD"
```

---

## Task 11: Build Admin – Hours, Contact & About Editors

**Files:**
- Create: `app/admin/oppettider/page.tsx`
- Create: `app/admin/kontakt/page.tsx`
- Create: `app/admin/om-oss/page.tsx`
- Create: `app/api/hours/route.ts`
- Create: `app/api/contact/route.ts`
- Create: `app/api/about/route.ts`

**Step 1: Create remaining API routes**

`app/api/hours/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { getHours, saveHours } from '@/lib/data';

export async function GET() {
  return NextResponse.json(getHours());
}

export async function PUT(request: Request) {
  const data = await request.json();
  saveHours(data);
  return NextResponse.json({ success: true });
}
```

`app/api/contact/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { getContact, saveContact } from '@/lib/data';

export async function GET() {
  return NextResponse.json(getContact());
}

export async function PUT(request: Request) {
  const data = await request.json();
  saveContact(data);
  return NextResponse.json({ success: true });
}
```

`app/api/about/route.ts`:
```ts
import { NextResponse } from 'next/server';
import { getAbout, saveAbout } from '@/lib/data';

export async function GET() {
  return NextResponse.json(getAbout());
}

export async function PUT(request: Request) {
  const data = await request.json();
  saveAbout(data);
  return NextResponse.json({ success: true });
}
```

**Step 2: Write `app/admin/oppettider/page.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type HourEntry = { day: string; hours: string };

export default function AdminHours() {
  const [hours, setHours] = useState<HourEntry[]>([]);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((d) => { if (!d.authenticated) router.push('/admin'); });
    fetch('/api/hours').then((r) => r.json()).then(setHours);
  }, [router]);

  async function save() {
    setSaving(true);
    await fetch('/api/hours', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hours),
    });
    setSaving(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-burgundy)' }}>Öppettider</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="/admin" style={{ color: 'var(--color-gray)' }}>Tillbaka</a>
          <button onClick={save} disabled={saving} style={{
            padding: '0.6rem 1.5rem', background: 'var(--color-crimson)', color: 'white',
            border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer',
          }}>
            {saving ? 'Sparar...' : 'Spara'}
          </button>
        </div>
      </div>
      {hours.map((h, i) => (
        <div key={h.day} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
          <span style={{ width: 100, fontWeight: 500 }}>{h.day}</span>
          <input
            value={h.hours}
            onChange={(e) => {
              const updated = [...hours];
              updated[i] = { ...h, hours: e.target.value };
              setHours(updated);
            }}
            style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--color-light-gray)', borderRadius: 4, fontFamily: 'var(--font-family)' }}
          />
        </div>
      ))}
    </div>
  );
}
```

**Step 3: Write `app/admin/kontakt/page.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ContactData = { address: string; phone: string; googleMapsUrl: string };

export default function AdminContact() {
  const [contact, setContact] = useState<ContactData>({ address: '', phone: '', googleMapsUrl: '' });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((d) => { if (!d.authenticated) router.push('/admin'); });
    fetch('/api/contact').then((r) => r.json()).then(setContact);
  }, [router]);

  async function save() {
    setSaving(true);
    await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    setSaving(false);
  }

  const inputStyle = {
    width: '100%', padding: '0.5rem', border: '1px solid var(--color-light-gray)',
    borderRadius: 4, fontFamily: 'var(--font-family)', fontSize: '1rem',
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-burgundy)' }}>Kontaktuppgifter</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="/admin" style={{ color: 'var(--color-gray)' }}>Tillbaka</a>
          <button onClick={save} disabled={saving} style={{
            padding: '0.6rem 1.5rem', background: 'var(--color-crimson)', color: 'white',
            border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer',
          }}>
            {saving ? 'Sparar...' : 'Spara'}
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          <span style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Adress</span>
          <input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} style={inputStyle} />
        </label>
        <label>
          <span style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Telefon</span>
          <input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} style={inputStyle} />
        </label>
        <label>
          <span style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Google Maps URL</span>
          <input value={contact.googleMapsUrl} onChange={(e) => setContact({ ...contact, googleMapsUrl: e.target.value })} style={inputStyle} />
        </label>
      </div>
    </div>
  );
}
```

**Step 4: Write `app/admin/om-oss/page.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AboutData = { title: string; text: string };

export default function AdminAbout() {
  const [about, setAbout] = useState<AboutData>({ title: '', text: '' });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((d) => { if (!d.authenticated) router.push('/admin'); });
    fetch('/api/about').then((r) => r.json()).then(setAbout);
  }, [router]);

  async function save() {
    setSaving(true);
    await fetch('/api/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(about),
    });
    setSaving(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-burgundy)' }}>Om oss</h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="/admin" style={{ color: 'var(--color-gray)' }}>Tillbaka</a>
          <button onClick={save} disabled={saving} style={{
            padding: '0.6rem 1.5rem', background: 'var(--color-crimson)', color: 'white',
            border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer',
          }}>
            {saving ? 'Sparar...' : 'Spara'}
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          <span style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Titel</span>
          <input
            value={about.title}
            onChange={(e) => setAbout({ ...about, title: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--color-light-gray)', borderRadius: 4, fontFamily: 'var(--font-family)', fontSize: '1rem' }}
          />
        </label>
        <label>
          <span style={{ fontWeight: 500, display: 'block', marginBottom: 4 }}>Text</span>
          <textarea
            value={about.text}
            onChange={(e) => setAbout({ ...about, text: e.target.value })}
            rows={8}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--color-light-gray)', borderRadius: 4, fontFamily: 'var(--font-family)', fontSize: '1rem', resize: 'vertical' }}
          />
        </label>
      </div>
    </div>
  );
}
```

**Step 5: Verify all admin editors**

Visit `/admin/oppettider`, `/admin/kontakt`, `/admin/om-oss` — edit and save, verify changes persist.

**Step 6: Commit**

```bash
git add app/admin/ app/api/hours/ app/api/contact/ app/api/about/
git commit -m "feat: add admin editors for hours, contact, and about"
```

---

## Task 12: Final Verification & Polish

**Step 1: Test all pages**

- `http://localhost:3000` — Hero, hours, contact card
- `http://localhost:3000/meny` — All menu categories, filters work
- `http://localhost:3000/om-oss` — About text, map link
- `http://localhost:3000/kontakt` — Phone, address, hours
- `http://localhost:3000/admin` — Login, dashboard, all editors

**Step 2: Test mobile responsiveness**

Open DevTools, test at 375px (mobile), 768px (tablet), 1200px (desktop).

**Step 3: Test click-to-call**

On mobile or via `tel:` link inspection.

**Step 4: Test admin CRUD**

- Add a new menu item, save, verify it appears on `/meny`
- Edit opening hours, save, verify on `/kontakt`
- Edit contact info, save, verify on home page
- Edit about text, save, verify on `/om-oss`

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final verification and polish"
```
