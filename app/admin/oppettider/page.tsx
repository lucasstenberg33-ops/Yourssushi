'use client';

export const runtime = 'edge';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type HourEntry = {
    day: string;
    hours: string;
};

export default function AdminOppettider() {
    const [hours, setHours] = useState<HourEntry[] | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/admin/check')
            .then((r) => r.json())
            .then((d) => { if (!d.authenticated) router.push('/admin'); });
        fetch('/api/hours')
            .then((r) => r.json())
            .then(setHours);
    }, [router]);

    async function save() {
        setSaving(true);
        await fetch('/api/hours', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hours),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function updateHour(idx: number, field: keyof HourEntry, value: string) {
        if (!hours) return;
        const updated = [...hours];
        updated[idx] = { ...updated[idx], [field]: value };
        setHours(updated);
    }

    if (!hours) return <div className={styles.loading}>Laddar...</div>;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Öppettider</h1>
                <div className={styles.actions}>
                    <a href="/admin" className={styles.back}>← Tillbaka</a>
                    <button onClick={save} disabled={saving} className={styles.saveBtn}>
                        {saving ? 'Sparar...' : saved ? '✓ Sparat' : 'Spara'}
                    </button>
                </div>
            </div>

            <div className={styles.card}>
                {hours.map((h, idx) => (
                    <div key={h.day} className={styles.row}>
                        <label className={styles.dayLabel}>{h.day}</label>
                        <input
                            value={h.hours}
                            onChange={(e) => updateHour(idx, 'hours', e.target.value)}
                            className={styles.input}
                            placeholder="t.ex. 11–21 eller Stängt"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
