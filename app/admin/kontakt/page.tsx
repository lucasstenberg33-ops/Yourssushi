'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

type ContactData = {
    address: string;
    phone: string;
    instagram: string;
    website: string;
    googleMapsUrl: string;
    notice: string;
};

export default function AdminKontakt() {
    const [contact, setContact] = useState<ContactData | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/admin/check')
            .then((r) => r.json())
            .then((d) => { if (!d.authenticated) router.push('/admin'); });
        fetch('/api/contact')
            .then((r) => r.json())
            .then(setContact);
    }, [router]);

    async function save() {
        setSaving(true);
        await fetch('/api/contact', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function update(field: keyof ContactData, value: string) {
        if (!contact) return;
        setContact({ ...contact, [field]: value });
    }

    if (!contact) return <div className={styles.loading}>Laddar...</div>;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Kontaktuppgifter</h1>
                <div className={styles.actions}>
                    <a href="/admin" className={styles.back}>← Tillbaka</a>
                    <button onClick={save} disabled={saving} className={styles.saveBtn}>
                        {saving ? 'Sparar...' : saved ? '✓ Sparat' : 'Spara'}
                    </button>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.field}>
                    <label>Telefon</label>
                    <input value={contact.phone} onChange={(e) => update('phone', e.target.value)} className={styles.input} />
                </div>
                <div className={styles.field}>
                    <label>Adress</label>
                    <input value={contact.address} onChange={(e) => update('address', e.target.value)} className={styles.input} />
                </div>
                <div className={styles.field}>
                    <label>Instagram</label>
                    <input value={contact.instagram} onChange={(e) => update('instagram', e.target.value)} className={styles.input} placeholder="t.ex. yours_sushi" />
                </div>
                <div className={styles.field}>
                    <label>Webbplats</label>
                    <input value={contact.website} onChange={(e) => update('website', e.target.value)} className={styles.input} placeholder="t.ex. sushinet.se" />
                </div>
                <div className={styles.field}>
                    <label>Google Maps URL</label>
                    <input value={contact.googleMapsUrl} onChange={(e) => update('googleMapsUrl', e.target.value)} className={styles.input} />
                </div>
                <div className={styles.field}>
                    <label>Notis (visas i meny/footer)</label>
                    <input value={contact.notice} onChange={(e) => update('notice', e.target.value)} className={styles.input} placeholder="t.ex. Misosoppa ingår vid köp" />
                </div>
            </div>
        </div>
    );
}
