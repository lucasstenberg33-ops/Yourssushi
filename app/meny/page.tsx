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
