'use client';

export const runtime = 'edge';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import styles from './page.module.css';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  priceNote?: string;
  tags?: string[];
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

type ContactData = {
  notice?: string;
};

const TAG_LABELS: Record<string, string> = {
  spicy: '🌶️ Starkt',
  recommended: '⭐ Rekommenderas',
  vegetarian: '🌱 Vegetariskt',
};

const TAG_ICONS: Record<string, string> = {
  spicy: '🌶️',
  recommended: '⭐',
  vegetarian: '🌱',
};

export default function MenyPage() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/menu')
      .then((r) => r.json())
      .then((data) => setMenu(data));
    fetch('/api/contact')
      .then((r) => r.json())
      .then((data) => setContact(data));
  }, []);

  if (!menu) return <div className={styles.loading}>Laddar meny...</div>;

  let filtered = activeCategory
    ? menu.categories.filter((c) => c.id === activeCategory)
    : menu.categories;

  // If tag filter is active, filter items within each category
  if (activeTag) {
    filtered = filtered
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => item.tags?.includes(activeTag)),
      }))
      .filter((cat) => cat.items.length > 0);
  }

  return (
    <div className={styles.page}>
      <FadeIn direction="down" className={styles.pageHeader}>
        <span className={styles.label}>Vårt Utbud</span>
        <h1 className={styles.title}>Meny</h1>
        <p className={styles.subtitle}>
          Klassiska sushifavoriter, fräscha rullar och varma asiatiska
          kötträtter, lagade med kärlek och noga utvalda råvaror.
        </p>
        <div className={styles.divider} />
      </FadeIn>

      {contact?.notice && (
        <FadeIn direction="up">
          <div className={styles.noticeBanner}>
            <span>🍜</span>
            <span>{contact.notice}</span>
          </div>
        </FadeIn>
      )}


      <FadeIn direction="up" delay={0.2} className={styles.filters}>
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
      </FadeIn>

      <FadeIn direction="up" delay={0.3} className={styles.tagFilters}>
        {Object.entries(TAG_LABELS).map(([key, label]) => (
          <button
            key={key}
            className={`${styles.tagChip} ${activeTag === key ? styles.activeTag : ''}`}
            onClick={() => setActiveTag(activeTag === key ? null : key)}
          >
            {label}
          </button>
        ))}
      </FadeIn>

      <div className={styles.menu}>
        {filtered.map((category) => (
          <FadeIn key={category.id} direction="up" delay={0.1} className={styles.category}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryName}>{category.name}</h2>
              {category.description && (
                <p className={styles.categoryDesc}>{category.description}</p>
              )}
            </div>
            <div className={styles.items}>
              {category.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemName}>
                      {item.name}
                      {item.tags && item.tags.length > 0 && (
                        <span className={styles.tags}>
                          {item.tags.map((t) => TAG_ICONS[t] || '').join(' ')}
                        </span>
                      )}
                    </span>
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

            {/* Visual Break Image Gallery after specific categories to avoid text-heavy page */}
            {category.name === 'Sushi' && (
              <div className={`overlap-gallery ${styles.menuVisualBreak}`}>
                <div className="overlap-main">
                  <Image
                    src="/Just_the_bowl_wood_table_kartong_bowl_2k_delpmaspu.png"
                    alt="Sushi preparation"
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
                <div className="overlap-secondary overlap-bottom-right overlap-landscape">
                  <Image
                    src="/Smaller_cuts_of_salmon_that_looks_marinated__2k_delpmaspu.png"
                    alt="Fresh salmon cuts"
                    fill
                    sizes="(max-width: 900px) 70vw, 40vw"
                  />
                </div>
              </div>
            )}

          </FadeIn>
        ))}
      </div>
    </div>
  );
}
