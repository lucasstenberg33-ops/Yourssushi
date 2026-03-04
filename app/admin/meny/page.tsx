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
  tags?: string[];
};

type Category = {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
};

type MenuData = { categories: Category[] };

const TAG_OPTIONS = [
  { key: 'spicy', label: '🌶️ Starkt' },
  { key: 'recommended', label: '⭐ Rekommenderas' },
  { key: 'vegetarian', label: '🌱 Vegetariskt' },
];

export default function AdminMeny() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
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
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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

  function toggleTag(catIdx: number, itemIdx: number, tag: string) {
    if (!menu) return;
    const updated = structuredClone(menu);
    const item = updated.categories[catIdx].items[itemIdx];
    if (!item.tags) item.tags = [];
    if (item.tags.includes(tag)) {
      item.tags = item.tags.filter((t: string) => t !== tag);
    } else {
      item.tags.push(tag);
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
      tags: [],
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
          <a href="/admin" className={styles.back}>← Tillbaka</a>
          <button onClick={save} disabled={saving} className={styles.saveBtn}>
            {saving ? 'Sparar...' : saved ? '✓ Sparat' : 'Spara'}
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
              <div className={styles.itemRow}>
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
              <div className={styles.tagRow}>
                {TAG_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    className={`${styles.tagBtn} ${item.tags?.includes(opt.key) ? styles.tagActive : ''}`}
                    onClick={() => toggleTag(catIdx, itemIdx, opt.key)}
                    type="button"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
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
