'use client';

export const runtime = 'edge';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type AboutData = {
    title: string;
    text: string;
};

export default function AdminOmOss() {
    const [about, setAbout] = useState<AboutData | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/admin/check')
            .then((r) => r.json())
            .then((d) => { if (!d.authenticated) router.push('/admin'); });
        fetch('/api/about')
            .then((r) => r.json())
            .then(setAbout);
    }, [router]);

    async function save() {
        setSaving(true);
        await fetch('/api/about', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(about),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    if (!about) return <div className={styles.loading}>Laddar...</div>;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Om oss</h1>
                <div className={styles.actions}>
                    <a href="/admin" className={styles.back}>← Tillbaka</a>
                    <button onClick={save} disabled={saving} className={styles.saveBtn}>
                        {saving ? 'Sparar...' : saved ? '✓ Sparat' : 'Spara'}
                    </button>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.field}>
                    <label>Rubrik</label>
                    <input
                        value={about.title}
                        onChange={(e) => setAbout({ ...about, title: e.target.value })}
                        className={styles.input}
                    />
                </div>
                <div className={styles.field}>
                    <label>Text</label>
                    <textarea
                        value={about.text}
                        onChange={(e) => setAbout({ ...about, text: e.target.value })}
                        className={styles.textarea}
                        rows={6}
                    />
                </div>
            </div>
        </div>
    );
}
